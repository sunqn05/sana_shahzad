import React from "react";
import "./ArtGallery.css";

function ArtGallery() {
  const featured = [
    {
      image: "/images/design-poster-1.png",
      title: "Midnight Drive",
      category: "Car Photography",
    },
    {
      image: "/images/img-3.jpg",
      title: "Poster Study",
      category: "Graphic Design",
    },
    {
      image: "/images/img-home.jpg",
      title: "Still Air",
      category: "Nature Photography",
    },
  ];

  const photography = [
    {
      image: "/images/img-3.jpg",
      title: "Car Photography",
      text: "Motion, reflections, details, and atmosphere.",
    },
    {
      image: "/images/img-4.jpg",
      title: "Portraits",
      text: "People, expression, mood, and personality.",
    },
    {
      image: "/images/img-5.jpg",
      title: "Nature",
      text: "Light, textures, landscapes, and quiet moments.",
    },
  ];

  const design = [
    {
      image: "/images/design-poster-1.png",
      title: "Posters",
      text: "Bold layouts, typography, and visual storytelling.",
    },
    {
      image: "/images/img-3.jpg",
      title: "Branding",
      text: "Logos, colour systems, identity, and presentation.",
    },
    {
      image: "/images/img-9.jpg",
      title: "Social Media",
      text: "Digital graphics, campaigns, and content design.",
    },
  ];

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <p className="gallery-label">Creative Gallery</p>
        <h1>My Precious Gems</h1>
        <p>
          A scrollable gallery of captured moments, visual ideas, and creative
          experiments.
        </p>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <p>Curated Selection</p>
          <h2>Featured Work</h2>
        </div>

        <div className="featured-grid">
          {featured.map((item, index) => (
            <div className="featured-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="featured-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <p>Through the Lens</p>
          <h2>Photography</h2>
        </div>

        <div className="category-grid">
          {photography.map((item, index) => (
            <div className="category-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="category-info">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <p>Visual Systems</p>
          <h2>Graphic Design</h2>
        </div>

        <div className="category-grid">
          {design.map((item, index) => (
            <div className="category-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="category-info">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtGallery;