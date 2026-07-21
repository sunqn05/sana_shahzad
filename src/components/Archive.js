import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

import "./Archive.css";

gsap.registerPlugin(Draggable);


function Archive() {
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const draggableRef = useRef(null);

  const didDragRef = useRef(false);

  const [zoom, setZoom] = useState(0.6);
  const [selectedImage, setSelectedImage] = useState(null);


  /* =========================
     YOUR IMAGES
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
     CREATE GRID
  ========================= */

  const gridItems = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const index =
        row * columns +
        column;

      const image =
        images[index % images.length];

      gridItems.push({
        id: index,
        image,
        row,
        column,
      });
    }
  }


  /* =========================
     CENTER CANVAS
  ========================= */

  const centerCanvas = (
    scale = zoom
  ) => {
    const viewport =
      viewportRef.current;

    const canvas =
      canvasRef.current;

    if (!viewport || !canvas) {
      return;
    }

    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;

    const scaledWidth =
      canvasWidth * scale;

    const scaledHeight =
      canvasHeight * scale;

    const x =
      (viewportWidth -
        scaledWidth) /
      2;

    const y =
      (viewportHeight -
        scaledHeight) /
      2;

    gsap.set(canvas, {
      x,
      y,
      scale,
      transformOrigin:
        "top left",
    });
  };


  /* =========================
     DRAG BOUNDS
  ========================= */

  const getBounds = (
    scale = zoom
  ) => {
    const viewport =
      viewportRef.current;

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
      canvasWidth * scale;

    const scaledHeight =
      canvasHeight * scale;

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
        (viewportWidth -
          scaledWidth) /
        2;

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
        (viewportHeight -
          scaledHeight) /
        2;

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
     DRAGGABLE
  ========================= */

  const createDraggable = (
    scale = zoom
  ) => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }


    if (
      draggableRef.current
    ) {
      draggableRef.current.kill();

      draggableRef.current =
        null;
    }


    const bounds =
      getBounds(scale);


    const draggable =
      Draggable.create(
        canvas,
        {
          type: "x,y",

          bounds,

          edgeResistance:
            0.82,

          minimumMovement: 5,

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

            /*
             * Keep this true briefly so
             * releasing a drag does not
             * accidentally open an image.
             */
            setTimeout(() => {
              didDragRef.current =
                false;
            }, 80);
          },
        }
      )[0];


    draggableRef.current =
      draggable;
  };


  /* =========================
     INITIALIZE
  ========================= */

  useLayoutEffect(() => {
    const canvas =
      canvasRef.current;

    const viewport =
      viewportRef.current;

    if (
      !canvas ||
      !viewport
    ) {
      return;
    }


    centerCanvas(zoom);

    createDraggable(zoom);


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

        ease: "power3.out",
      }
    );


    return () => {
      if (
        draggableRef.current
      ) {
        draggableRef.current.kill();
      }
    };

    // Intentionally only runs
    // when component mounts.
    // eslint-disable-next-line
  }, []);


  /* =========================
     ZOOM
  ========================= */

  const changeZoom = (
    newZoom
  ) => {
    const canvas =
      canvasRef.current;

    const viewport =
      viewportRef.current;

    if (
      !canvas ||
      !viewport
    ) {
      return;
    }


    setZoom(newZoom);


    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;


    const x =
      (viewportWidth -
        canvasWidth *
          newZoom) /
      2;

    const y =
      (viewportHeight -
        canvasHeight *
          newZoom) /
      2;


    if (
      draggableRef.current
    ) {
      draggableRef.current.disable();
    }


    gsap.to(canvas, {
      scale: newZoom,

      x,
      y,

      duration: 0.8,

      ease:
        "power3.inOut",

      onComplete: () => {
        createDraggable(
          newZoom
        );
      },
    });
  };


  /* =========================
     AUTO FIT
  ========================= */

  const fitCanvas = () => {
    const viewport =
      viewportRef.current;

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


    changeZoom(fitZoom);
  };


  /* =========================
     HANDLE RESIZE
  ========================= */

  useEffect(() => {
    const handleResize =
      () => {
        centerCanvas(zoom);

        createDraggable(
          zoom
        );
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

    // eslint-disable-next-line
  }, [zoom]);


  /* =========================
     IMAGE CLICK
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


  const closeImage = () => {
    setSelectedImage(null);


    if (
      draggableRef.current
    ) {
      draggableRef.current.enable();
    }
  };


  /* Escape closes image */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          "Escape"
        ) {
          closeImage();
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
  }, []);


  return (
    <section
      className="archive-section"
      id="creative-archive"
    >

      {/* =========================
          TOP TEXT
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
            Drag to explore
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
          DRAGGABLE VIEWPORT
      ========================== */}

      <div
        className="archive-viewport"
        ref={viewportRef}
      >

        <div
          className="archive-canvas"
          ref={canvasRef}
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

                key={item.id}

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


        {/* dark edge vignette */}

        <div className="archive-vignette" />

      </div>


      {/* =========================
          CONTROLS
      ========================== */}

      <div className="archive-controls">

        <div className="archive-percentage">
          {Math.round(
            zoom * 100
          )}
          %
        </div>


        <div className="archive-zoom-switch">

          <button
            className={
              zoom === 0.35
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(0.35)
            }
          >
            Zoom Out
          </button>


          <button
            className={
              zoom === 0.6
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(0.6)
            }
          >
            Normal
          </button>


          <button
            className={
              zoom === 0.9
                ? "archive-control active"
                : "archive-control"
            }

            onClick={() =>
              changeZoom(0.9)
            }
          >
            Zoom In
          </button>


          <button
            className="archive-control"

            onClick={
              fitCanvas
            }
          >
            Fit
          </button>

        </div>

      </div>


      {/* =========================
          IMAGE EXPANSION
      ========================== */}

      {selectedImage && (

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
            ) =>
              event.stopPropagation()
            }
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
              A moment from
              my collection of
              photography,
              design, and visual
              experiments.
            </p>

          </div>


          <button
            className="archive-close"

            onClick={
              closeImage
            }

            aria-label="Close image"
          >
            ←
          </button>

        </div>

      )}

    </section>
  );
}


export default Archive;