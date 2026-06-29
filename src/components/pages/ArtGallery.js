import React from "react";
import "./ArtGallery.css";

function ArtGallery() {
  const photography = [
    {
      folder: "animal",
      cover: "photo-1.jpg",
      title: "Animal Photography",
      description: "Animals, movement, expression, and detail.",
      images: ["photo-1.jpg", "photo-2.png", "photo-3.jpg"],
    },
    {
      folder: "people",
      cover: "photo-1.jpg",
      title: "People Photography",
      description: "Portraits, candid moments, personality, and mood.",
      images: ["photo-1.jpg", "photo-2.png", "photo-3.jpg"],
    },
    {
      folder: "car",
      cover: "photo-1.jpg",
      title: "Car Photography",
      description: "Reflections, angles, motion, and automotive details.",
      images: ["photo-1.jpg", "photo-2.png", "photo-3.jpg"],
    },
    {
      folder: "product",
      cover: "photo-1.jpg",
      title: "Product Photography",
      description: "Clean product shots, lighting, styling, and presentation.",
      images: ["photo-1.jpg", "photo-2.png", "photo-3.jpg"],
    },
  ];

  const design = [
    {
      folder: "illustrator",
      cover: "art-1.png",
      title: "Illustrator",
      description: "Vector artwork, layouts, icons, and digital illustrations.",
      images: ["art-1.png", "art-2.jpg", "art-3.png"],
    },
    {
      folder: "business",
      cover: "art-1.png",
      title: "Business Design",
      description: "Branding, professional graphics, and visual identity work.",
      images: ["art-1.png", "art-2.jpg", "art-3.png"],
    },
    {
      folder: "photoshop",
      cover: "art-1.png",
      title: "Photoshop",
      description: "Photo edits, composites, posters, and creative manipulation.",
      images: ["art-1.png", "art-2.jpg", "art-3.png"],
    },
  ];

  const renderCategory = (item) => (
    <div className="category-card" key={item.folder}>
      <img
        src={`/images/${item.folder}/${item.cover}`}
        alt={item.title}
      />

      <div className="category-info">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span>{item.images.length} pieces</span>
      </div>
    </div>
  );

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <p className="gallery-label">Creative Gallery</p>
        <h1>Photography & Design</h1>
        <p>
          A scrollable gallery of captured moments, visual ideas, and creative
          experiments.
        </p>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <p>Through the Lens</p>
          <h2>Photography</h2>
        </div>

        <div className="category-grid">
          {photography.map(renderCategory)}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <p>Visual Systems</p>
          <h2>Graphic Design</h2>
        </div>

        <div className="category-grid">
          {design.map(renderCategory)}
        </div>
      </section>
    </div>
  );
}

export default ArtGallery;