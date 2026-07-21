import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

import "./Archive.css";

gsap.registerPlugin(Draggable);

function Archive() {
  /* =========================
     PREVIEW REFS
  ========================= */

  const previewViewportRef = useRef(null);
  const previewCanvasRef = useRef(null);

  /* =========================
     FULLSCREEN REFS
  ========================= */

  const fullscreenViewportRef = useRef(null);
  const fullscreenCanvasRef = useRef(null);

  const draggableRef = useRef(null);
  const didDragRef = useRef(false);

  /* =========================
     STATE
  ========================= */

  const [zoom, setZoom] = useState(0.6);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 900
  );

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  /* =========================
     IMAGES
  ========================= */

  const images = [
    "/images/me/me-1.jpg",
    "/images/me/me-2.jpg",
    "/images/me/me-3.jpg",
    "/images/me/me-4.jpeg",
    "/images/me/me-5.jpg",
    "/images/me/me-6.jpg",
    "/images/me/me-7.jpeg",
    "/images/me/me-8.jpeg",
    "/images/me/me-9.jpg",
    "/images/me/me-10.jpg",
    "/images/me/me-11.jpg",
    "/images/me/me-12.jpg",
    "/images/me/me-14.jpg",

    "/images/about/about-1.jpg",
    "/images/about/about-2.jpg",
    "/images/about/about-3.jpg",
    "/images/about/about-4.jpg",
    "/images/about/about-5.jpg",
    "/images/about/about-6.jpg",
    "/images/about/about-7.jpg",
    "/images/about/about-8.jpg",
    "/images/about/about-9.jpg",
    "/images/about/about-10.jpg",
    "/images/about/about-11.jpg",
    "/images/about/about-12.jpg",
  ];

  /* =========================
     GRID SETTINGS
  ========================= */

  const rows = 7;
  const columns = 10;

  const itemSize = 300;
  const gap = 26;

  const canvasWidth =
    columns * itemSize +
    (columns - 1) * gap;

  const canvasHeight =
    rows * itemSize +
    (rows - 1) * gap;

  /* =========================
     GRID ITEMS
  ========================= */

  const gridItems = [];

  for (let row = 0; row < rows; row++) {
    for (
      let column = 0;
      column < columns;
      column++
    ) {
      const index =
        row * columns +
        column;

      gridItems.push({
        id: index,

        image:
          images[
            index %
              images.length
          ],

        row,
        column,
      });
    }
  }

  /* =========================
     CURRENT ACTIVE ELEMENTS
  ========================= */

  const getActiveViewport = () => {
    if (
      isMobile &&
      isFullscreen
    ) {
      return fullscreenViewportRef.current;
    }

    return previewViewportRef.current;
  };

  const getActiveCanvas = () => {
    if (
      isMobile &&
      isFullscreen
    ) {
      return fullscreenCanvasRef.current;
    }

    return previewCanvasRef.current;
  };

  /* =========================
     MOBILE CHECK
  ========================= */

  useEffect(() => {
    const handleResize = () => {
      const mobile =
        window.innerWidth <= 900;

      setIsMobile(mobile);

      /*
       * If resizing to desktop
       * while fullscreen is open,
       * close mobile fullscreen.
       */
      if (
        !mobile &&
        isFullscreen
      ) {
        setIsFullscreen(false);

        document.body.classList.remove(
          "archive-fullscreen-open"
        );
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [isFullscreen]);

  /* =========================
     CENTER CANVAS
  ========================= */

  const centerCanvas = (
    scale = zoom
  ) => {
    const viewport =
      getActiveViewport();

    const canvas =
      getActiveCanvas();

    if (
      !viewport ||
      !canvas
    ) {
      return;
    }

    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;

    const scaledWidth =
      canvasWidth *
      scale;

    const scaledHeight =
      canvasHeight *
      scale;

    const x =
      (
        viewportWidth -
        scaledWidth
      ) / 2;

    const y =
      (
        viewportHeight -
        scaledHeight
      ) / 2;

    gsap.set(
      canvas,
      {
        x,
        y,
        scale,

        transformOrigin:
          "top left",
      }
    );
  };

  /* =========================
     DRAG BOUNDS
  ========================= */

  const getBounds = (
    scale = zoom
  ) => {
    const viewport =
      getActiveViewport();

    if (!viewport) {
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      };
    }

    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;

    const scaledWidth =
      canvasWidth *
      scale;

    const scaledHeight =
      canvasHeight *
      scale;

    const margin = 60;

    let minX;
    let maxX;

    let minY;
    let maxY;

    if (
      scaledWidth <=
      viewportWidth
    ) {
      const centerX =
        (
          viewportWidth -
          scaledWidth
        ) / 2;

      minX = centerX;
      maxX = centerX;
    } else {
      minX =
        viewportWidth -
        scaledWidth -
        margin;

      maxX = margin;
    }

    if (
      scaledHeight <=
      viewportHeight
    ) {
      const centerY =
        (
          viewportHeight -
          scaledHeight
        ) / 2;

      minY = centerY;
      maxY = centerY;
    } else {
      minY =
        viewportHeight -
        scaledHeight -
        margin;

      maxY = margin;
    }

    return {
      minX,
      maxX,
      minY,
      maxY,
    };
  };

  /* =========================
     CREATE DRAGGABLE
  ========================= */

  const createDraggable = (
    scale = zoom
  ) => {
    const canvas =
      getActiveCanvas();

    if (!canvas) {
      return;
    }

    /*
     * Remove previous instance.
     */
    if (
      draggableRef.current
    ) {
      draggableRef.current.kill();

      draggableRef.current =
        null;
    }

    /*
     * Mobile preview:
     * no dragging.
     */
    if (
      isMobile &&
      !isFullscreen
    ) {
      return;
    }

    const bounds =
      getBounds(scale);

    draggableRef.current =
      Draggable.create(
        canvas,
        {
          type: "x,y",

          bounds,

          edgeResistance:
            0.82,

          minimumMovement:
            5,

          onDragStart() {
            didDragRef.current =
              true;

            document.body.classList.add(
              "archive-is-dragging"
            );
          },

          onDragEnd() {
            document.body.classList.remove(
              "archive-is-dragging"
            );

            setTimeout(
              () => {
                didDragRef.current =
                  false;
              },
              80
            );
          },
        }
      )[0];
  };

  /* =========================
     INITIAL DESKTOP/PREVIEW
  ========================= */

  useLayoutEffect(() => {
    const canvas =
      previewCanvasRef.current;

    const viewport =
      previewViewportRef.current;

    if (
      !canvas ||
      !viewport
    ) {
      return;
    }

    /*
     * Center preview.
     */
    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;

    const x =
      (
        viewportWidth -
        canvasWidth * zoom
      ) / 2;

    const y =
      (
        viewportHeight -
        canvasHeight * zoom
      ) / 2;

    gsap.set(
      canvas,
      {
        x,
        y,
        scale: zoom,

        transformOrigin:
          "top left",
      }
    );

    /*
     * Desktop only:
     * make preview draggable.
     */
    if (!isMobile) {
      createDraggable(
        zoom
      );
    }

    /*
     * Intro animation.
     */
    const items =
      canvas.querySelectorAll(
        ".archive-grid-item"
      );

    gsap.fromTo(
      items,
      {
        opacity: 0,
        scale: 0.88,
      },
      {
        opacity: 1,
        scale: 1,

        duration: 0.7,

        stagger: {
          amount: 1.2,
          from: "center",
        },

        ease:
          "power3.out",
      }
    );

    return () => {
      if (
        draggableRef.current
      ) {
        draggableRef.current.kill();

        draggableRef.current =
          null;
      }
    };

    // eslint-disable-next-line
  }, []);

  /* =========================
     FULLSCREEN INITIALIZE
  ========================= */

  useEffect(() => {
    if (
      !isFullscreen
    ) {
      /*
       * After leaving fullscreen,
       * desktop may need its
       * draggable restored.
       */
      if (!isMobile) {
        requestAnimationFrame(
          () => {
            centerCanvas(
              zoom
            );

            createDraggable(
              zoom
            );
          }
        );
      }

      return;
    }

    /*
     * Wait until portal is
     * mounted into document.body.
     */
    const frame =
      requestAnimationFrame(
        () => {
          const viewport =
            fullscreenViewportRef.current;

          const canvas =
            fullscreenCanvasRef.current;

          if (
            !viewport ||
            !canvas
          ) {
            return;
          }

          const x =
            (
              viewport.clientWidth -
              canvasWidth *
                zoom
            ) / 2;

          const y =
            (
              viewport.clientHeight -
              canvasHeight *
                zoom
            ) / 2;

          gsap.set(
            canvas,
            {
              x,
              y,
              scale: zoom,

              transformOrigin:
                "top left",
            }
          );

          createDraggable(
            zoom
          );
        }
      );

    return () => {
      cancelAnimationFrame(
        frame
      );
    };

    // eslint-disable-next-line
  }, [
    isFullscreen,
    isMobile,
  ]);

  /* =========================
     OPEN FULLSCREEN
  ========================= */

  const openFullscreen =
    () => {
      /*
       * Kill preview draggable
       * before portal mounts.
       */
      if (
        draggableRef.current
      ) {
        draggableRef.current.kill();

        draggableRef.current =
          null;
      }

      document.body.classList.add(
        "archive-fullscreen-open"
      );

      setIsFullscreen(
        true
      );
    };

  /* =========================
     CLOSE FULLSCREEN
  ========================= */

  const closeFullscreen =
    () => {
      setSelectedImage(
        null
      );

      if (
        draggableRef.current
      ) {
        draggableRef.current.kill();

        draggableRef.current =
          null;
      }

      setIsFullscreen(
        false
      );

      document.body.classList.remove(
        "archive-fullscreen-open"
      );
    };

  /* =========================
     BODY CLEANUP
  ========================= */

  useEffect(() => {
    return () => {
      document.body.classList.remove(
        "archive-fullscreen-open"
      );

      document.body.classList.remove(
        "archive-is-dragging"
      );
    };
  }, []);

  /* =========================
     CHANGE ZOOM
  ========================= */

  const changeZoom = (
    newZoom
  ) => {
    const canvas =
      getActiveCanvas();

    const viewport =
      getActiveViewport();

    if (
      !canvas ||
      !viewport
    ) {
      return;
    }

    setZoom(
      newZoom
    );

    const x =
      (
        viewport.clientWidth -
        canvasWidth *
          newZoom
      ) / 2;

    const y =
      (
        viewport.clientHeight -
        canvasHeight *
          newZoom
      ) / 2;

    if (
      draggableRef.current
    ) {
      draggableRef.current.disable();
    }

    gsap.to(
      canvas,
      {
        scale:
          newZoom,

        x,
        y,

        duration:
          0.8,

        ease:
          "power3.inOut",

        onComplete() {
          createDraggable(
            newZoom
          );
        },
      }
    );
  };

  /* =========================
     FIT CANVAS
  ========================= */

  const fitCanvas =
    () => {
      const viewport =
        getActiveViewport();

      if (!viewport) {
        return;
      }

      const availableWidth =
        viewport.clientWidth -
        100;

      const availableHeight =
        viewport.clientHeight -
        100;

      const widthZoom =
        availableWidth /
        canvasWidth;

      const heightZoom =
        availableHeight /
        canvasHeight;

      let fitZoom =
        Math.min(
          widthZoom,
          heightZoom
        );

      fitZoom =
        Math.max(
          0.18,
          Math.min(
            fitZoom,
            1
          )
        );

      changeZoom(
        fitZoom
      );
    };

  /* =========================
     OPEN IMAGE
  ========================= */

  const openImage = (
    image,
    index
  ) => {
    if (
      didDragRef.current
    ) {
      return;
    }

    /*
     * Images cannot open
     * from mobile preview.
     */
    if (
      isMobile &&
      !isFullscreen
    ) {
      return;
    }

    if (
      draggableRef.current
    ) {
      draggableRef.current.disable();
    }

    setSelectedImage({
      image,
      index,
    });
  };

  /* =========================
     CLOSE IMAGE
  ========================= */

  const closeImage =
    () => {
      setSelectedImage(
        null
      );

      if (
        draggableRef.current
      ) {
        draggableRef.current.enable();
      }
    };

  /* =========================
     ESCAPE KEY
  ========================= */

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      if (
        selectedImage
      ) {
        closeImage();

        return;
      }

      if (
        isFullscreen
      ) {
        closeFullscreen();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

    // eslint-disable-next-line
  }, [
    selectedImage,
    isFullscreen,
  ]);

  /* =========================
     GRID CONTENT
  ========================= */

  const renderGrid = (
    fullscreen = false
  ) => (
    <>
      <div
        className="archive-canvas"

        ref={
          fullscreen
            ? fullscreenCanvasRef
            : previewCanvasRef
        }

        style={{
          width:
            `${canvasWidth}px`,

          height:
            `${canvasHeight}px`,
        }}
      >
        {gridItems.map(
          (
            item,
            index
          ) => (
            <button
              type="button"

              className="archive-grid-item"

              key={
                fullscreen
                  ? `fullscreen-${item.id}`
                  : `preview-${item.id}`
              }

              style={{
                left:
                  item.column *
                  (
                    itemSize +
                    gap
                  ),

                top:
                  item.row *
                  (
                    itemSize +
                    gap
                  ),

                width:
                  itemSize,

                height:
                  itemSize,
              }}

              onClick={() =>
                openImage(
                  item.image,
                  index
                )
              }
            >
              <img
                src={
                  item.image
                }

                alt={`Creative archive ${
                  index + 1
                }`}

                draggable="false"
              />
            </button>
          )
        )}
      </div>

      <div className="archive-vignette" />
    </>
  );

  /* =========================
     CONTROLS CONTENT
  ========================= */

  const renderControls =
    () => (
      <div className="archive-controls">

        <div className="archive-percentage">
          {Math.round(
            zoom *
              100
          )}
          %
        </div>

        <div className="archive-zoom-switch">

          <button
            type="button"

            className={
              zoom === 0.35
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(
                0.35
              )
            }
          >
            Zoom Out
          </button>

          <button
            type="button"

            className={
              zoom === 0.6
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(
                0.6
              )
            }
          >
            Normal
          </button>

          <button
            type="button"

            className={
              zoom === 0.9
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(
                0.9
              )
            }
          >
            Zoom In
          </button>

          <button
            type="button"
            className="archive-control"

            onClick={
              fitCanvas
            }
          >
            Fit
          </button>

        </div>

      </div>
    );

  return (
    <section
      className="archive-section"
      id="creative-archive"
    >

      {/* =========================
          HEADER
      ========================== */}

      <div className="archive-header">

        <div className="archive-title-group">

          <span className="archive-label">
            03 — ARCHIVE
          </span>

          <h2>
            Creative Archive
          </h2>

        </div>


        <div className="archive-header-right">

          <span className="archive-drag-hint">

            {isMobile
              ? "Interactive Archive"
              : "Drag to explore"}

          </span>


          <Link
            to="/gallery"
            className="archive-gallery-link"
          >
            Enter Gallery ↗
          </Link>

        </div>

      </div>


      {/* =========================
          NORMAL PAGE PREVIEW
      ========================== */}

      <div className="archive-preview-wrapper">

        <div className="archive-experience">

          <div
            className="archive-viewport"

            ref={
              previewViewportRef
            }
          >
            {renderGrid(false)}
          </div>


          {/* Desktop controls */}

          {!isMobile &&
            renderControls()}

        </div>


        {/* =========================
            MOBILE FULLSCREEN BUTTON
        ========================== */}

        {isMobile &&
          !isFullscreen && (

          <div className="archive-mobile-overlay">

            <button
              type="button"

              className="archive-fullscreen-button"

              onClick={
                openFullscreen
              }
            >
              Explore Fullscreen ↗
            </button>

          </div>

        )}

      </div>


      {/* =========================
          MOBILE FULLSCREEN PORTAL
      ========================== */}

      {isMobile &&
        isFullscreen &&
        createPortal(

          <div className="archive-fullscreen-portal">

            {/* TOP BAR */}

            <div className="archive-fullscreen-bar">

              <span>
                Drag to explore
              </span>


              <button
                type="button"

                className="archive-fullscreen-close"

                onClick={
                  closeFullscreen
                }
              >
                Close ×
              </button>

            </div>


            {/* FULLSCREEN GRID */}

            <div
              className="archive-viewport archive-viewport-fullscreen"

              ref={
                fullscreenViewportRef
              }
            >

              {renderGrid(true)}

            </div>


            {/* FULLSCREEN CONTROLS */}

            <div className="archive-fullscreen-controls">

              {renderControls()}

            </div>

          </div>,

          document.body
        )}


      {/* =========================
          IMAGE LIGHTBOX
      ========================== */}

      {selectedImage &&
        createPortal(

          <div
            className="archive-lightbox"

            onClick={
              closeImage
            }
          >

            <div
              className="archive-lightbox-image"

              onClick={(
                event
              ) => {
                event.stopPropagation();
              }}
            >

              <img
                src={
                  selectedImage.image
                }

                alt="Selected creative work"
              />

            </div>


            <div className="archive-lightbox-info">

              <span>

                {String(
                  (
                    selectedImage.index %
                    images.length
                  ) +
                    1
                ).padStart(
                  2,
                  "0"
                )}

              </span>


              <h3>
                Creative Archive
              </h3>


              <p>
                A moment from my
                collection of
                photography,
                design, and visual
                experiments.
              </p>

            </div>


            <button
              type="button"

              className="archive-close"

              onClick={
                closeImage
              }

              aria-label="Close image"
            >
              ←
            </button>

          </div>,

          document.body
        )}

    </section>
  );
}

export default Archive;