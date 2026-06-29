import React from "react";
import "./ArtGallery.css";

function ArtGallery() {
  const artworks = [
    {
      image: "/images/art-1.png",
      title: "Artwork One",
      type: "Sketch",
      year: "2026",
    },
    {
      image: "/images/art-2.jpg",
      title: "Artwork Two",
      type: "Digital Art",
      year: "2026",
    },
    {
      image: "/images/art-3.jpg",
      title: "Artwork Three",
      type: "Painting",
      year: "2025",
    },
    {
      image: "/images/art-4.jpg",
      title: "Artwork Four",
      type: "Mixed Media",
      year: "2025",
    },
  ];

  return (
    <div className="art-gallery-page">
      <section className="art-hero">
        <p className="art-kicker">Creative Portfolio</p>
        <h1>Art Gallery</h1>
        <div className="wave-line">〰</div>
        <p>
          A collection of my artwork, sketches, experiments, and visual ideas.
        </p>
      </section>

      <section className="filter-row">
        <button>All</button>
        <button>Sketches</button>
        <button>Paintings</button>
        <button>Digital</button>
        <button>Mixed Media</button>
      </section>

      <section className="art-grid">
        {artworks.map((art, index) => (
          <div className="art-card" key={index}>
            <img src={art.image} alt={art.title} />

            <div className="art-info">
              <h3>{art.title}</h3>
              <p>
                {art.type} • {art.year}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ArtGallery;