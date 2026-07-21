import React, { useEffect, useState } from "react";
import LiquidEther from "../LiquidEther";
import "./ArtGallery.css";

function GalleryMosaic({ items, onOpenImage }) {
  const [activeImages, setActiveImages] = useState({});

  const getImageIndex = (folder) => {
    return activeImages[folder] || 0;
  };

  const changeImage = (e, item, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const currentIndex = getImageIndex(item.folder);

    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = item.images.length - 1;
    }

    if (newIndex >= item.images.length) {
      newIndex = 0;
    }

    setActiveImages((prev) => ({
      ...prev,
      [item.folder]: newIndex,
    }));
  };

  return (
    <div className={`gallery-mosaic ${items.length === 3 ? "design-mosaic" : ""}`}>
      {items.map((item, index) => {
        const imageIndex = getImageIndex(item.folder);
        const image = item.images[imageIndex];

        return (
          <div
            className={`mosaic-item mosaic-item-${index + 1}`}
            key={item.folder}
          >
            <img
              src={`/images/${item.folder}/${image}`}
              alt={item.title}
            />

            <div
              className="mosaic-overlay"
              onClick={() =>
                onOpenImage(item, imageIndex)
              }
            >
              <h3>{item.title}</h3>

              <span className="mosaic-line" />

              <span className="mosaic-view">
                View Full Image
              </span>

              <div className="mosaic-controls">
                <button
                  type="button"
                  onClick={(e) =>
                    changeImage(e, item, -1)
                  }
                  aria-label={`Previous ${item.title} image`}
                >
                  ←
                </button>

                <span>
                  {imageIndex + 1} / {item.images.length}
                </span>

                <button
                  type="button"
                  onClick={(e) =>
                    changeImage(e, item, 1)
                  }
                  aria-label={`Next ${item.title} image`}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ArtGallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (item, imageIndex) => {
    setLightbox({
      item,
      imageIndex,
    });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const changeLightboxImage = (direction) => {
    setLightbox((current) => {
      if (!current) return null;

      let newIndex =
        current.imageIndex + direction;

      if (newIndex < 0) {
        newIndex =
          current.item.images.length - 1;
      }

      if (
        newIndex >=
        current.item.images.length
      ) {
        newIndex = 0;
      }

      return {
        ...current,
        imageIndex: newIndex,
      };
    });
  };

  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(
        window.location.hash
      );

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;

      if (e.key === "Escape") {
        closeLightbox();
      }

      if (e.key === "ArrowLeft") {
        changeLightboxImage(-1);
      }

      if (e.key === "ArrowRight") {
        changeLightboxImage(1);
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
  }, [lightbox]);

  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(
        window.location.hash
      );

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, []);

  const photography = [
    {
      folder: "animal",
      cover: "photo-1.jpg",
      title: "Animal Photography",
      description:
        "Animals, movement, expression, and detail.",
      images: [
        "photo-1.jpg",
        "photo-2.jpg",
        "photo-3.jpg",
        "photo-5.jpg",
        "photo-6.jpg"
      ],
    },
    {
      folder: "people",
      cover: "photo-1.jpg",
      title: "People Photography",
      description:
        "Portraits, candid moments, personality, and mood.",
      images: [
        "photo-1.jpg",
        "photo-2.jpg",
        "photo-3.jpg",
        "photo-4.jpg",
        "photo-5.jpg",
        "photo-6.jpg"
      ],
    },
    {
      folder: "car",
      cover: "photo-1.jpg",
      title: "Car Photography",
      description:
        "Reflections, angles, motion, and automotive details.",
      images: [
        "photo-1.jpg",
        "photo-2.jpg",
        "photo-3.jpg",
        "photo-4.jpg",
        "photo-5.jpg",
        "photo-6.jpg"
      ],
    },
    {
      folder: "product",
      cover: "photo-1.png",
      title: "Product Photography",
      description:
        "Clean product shots, lighting, styling, and presentation.",
      images: [
        "photo-1.png",
        "photo-2.jpg",
        "photo-3.png",
        "photo-4.jpg",
        "photo-5.jpg"
      ],
    },
  ];

  const design = [
    {
      folder: "illustrator",
      cover: "art-1.png",
      title: "Illustrator",
      description:
        "Vector artwork, layouts, icons, and digital illustrations.",
      images: [
        "art-1.png",
        "art-2.png",
        "art-3.png",
      ],
    },
    {
      folder: "business",
      cover: "art-1.jpg",
      title: "Business Design",
      description:
        "Branding, professional graphics, and visual identity work.",
      images: [
        "art-1.jpg",
        "art-2.png",
        "art-3.jpg",
        "art-4.jpg",
        "art-5.png",
        "art-6.png",
        "art-7.png",
        "art-8.png",
      ],
    },
    {
      folder: "photoshop",
      cover: "art-1.png",
      title: "Photoshop",
      description:
        "Photo edits, composites, posters, and creative manipulation.",
      images: [
        "art-1.png",
        "art-2.jpg",
        "art-3.jpg",
      ],
    },
  ];

  return (
    
  <div className="gallery-page">

    <div className="gallery-liquid-background">
      <LiquidEther
        colors={[
          "#001B33",
          "#0A4D68",
          "#3FA7D6",
          "#E7D7B2"
        ]}
        mouseForce={18}
        cursorSize={150}
        isViscous
        viscous={50}
        autoDemo={false}
      />
    </div>

    {/* EVERYTHING ELSE */}
    <div className="gallery-content">
      <section className="gallery-hero">
        <p className="gallery-label">
          Creative Gallery
        </p>

        <h1>
          My Art
        </h1>

        <p className="gallery-description">
          A collection of different photography and graphic design skills!
        </p>

        <a href="#photography" className="gallery-explore">
          ↓ Explore the Collections
        </a>
      </section>

      <section
        className="gallery-section photography-section"
        id="photography"
      >
        <div className="section-heading">
          <p>01</p>
          <h2>Photography</h2>
        </div>

        <GalleryMosaic
          items={photography}
          onOpenImage={openLightbox}
        />

        <a href="#design" className="gallery-mobile-nav gallery-next-section">
          ↓ Explore Graphic Design
        </a>
      </section>

      <section
        className="gallery-section design-section"
        id="design"
      >
        <div className="section-heading">
          <p>02</p>
          <h2>Graphic Design</h2>
        </div>

        <GalleryMosaic
          items={design}
          onOpenImage={openLightbox}
        />
        <a href="#photography" className="gallery-mobile-nav gallery-back-section">
          ↑ Back to Photography
        </a>
      </section>
    </div>

    {lightbox && (
      <div
        className="gallery-lightbox"
        onClick={closeLightbox}
      >
        <button
          className="lightbox-close"
          type="button"
          onClick={closeLightbox}
          aria-label="Close image"
        >
          ×
        </button>

        <button
          className="lightbox-arrow lightbox-arrow-left"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            changeLightboxImage(-1);
          }}
          aria-label="Previous image"
        >
          ←
        </button>

        <div
          className="lightbox-content"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <img
            src={`/images/${
              lightbox.item.folder
            }/${
              lightbox.item.images[
                lightbox.imageIndex
              ]
            }`}
            alt={lightbox.item.title}
          />

          <div className="lightbox-info">
            <h3>
              {lightbox.item.title}
            </h3>

            <span>
              {lightbox.imageIndex + 1}
              {" / "}
              {lightbox.item.images.length}
            </span>
          </div>
        </div>

        <button
          className="lightbox-arrow lightbox-arrow-right"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            changeLightboxImage(1);
          }}
          aria-label="Next image"
        >
          →
        </button>
      </div>
    )}

  </div>
);

}

export default ArtGallery;