import React, { useEffect, useRef, useState } from "react";
import Masonry from "./Masonry";
import "./Cards.css";

function Cards() {
  const [startMasonry, setStartMasonry] = useState(false);
  const sectionRef = useRef(null);

  const items = [
    {
      id: "photography",
      type: "main",
      number: "01",
      title: "Photography",
      text: "Portraits, products, animals, cars, and captured moments.",
      cta: "View Gallery →",
      img: "/images/img-5.jpg",
      url: "/gallery#photography",
      height: 760,
    },
    {
      id: "ocean-1",
      type: "image",
      img: "/images/video-poster.png",
      url: "#",
      height: 420,
    },
    {
      id: "design",
      type: "main",
      number: "02",
      title: "Graphic Design",
      text: "Posters, branding, visual systems, Photoshop, and Illustrator.",
      cta: "View Design →",
      img: "/images/img-4.jpg",
      url: "/gallery#design",
      height: 610,
    },
    {
      id: "color-1",
      type: "image",
      img: "/images/img-9.jpg",
      height: 360,
    },
    {
      id: "texture-1",
      type: "image",
      img: "/images/img-2.jpg",
      url: "#",
      height: 460,
    },
    {
      id: "projects",
      type: "main",
      number: "03",
      title: "Projects",
      text: "Creative coding, web experiments, and frontend builds.",
      cta: "View Projects →",
      img: "/images/img-3.jpg",
      url: "/projects",
      height: 720,
    },
    {
      id: "about",
      type: "main",
      number: "04",
      title: "About Me",
      text: "A little about who I am, what I make, and what drives me.",
      cta: "Read More →",
      img: "/images/img-9.jpg",
      url: "/about",
      height: 500,
    },
    {
      id: "texture-2",
      type: "image",
      img: "/images/video-poster.png",
      url: "#",
      height: 340,
    },
    {
      id: "color-2",
      type: "color",
      url: "#",
      height: 300,
    },
    {
      id: "texture-3",
      type: "image",
      img: "/images/img-6.jpg",
      url: "#",
      height: 430,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartMasonry(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="collage-section" id="work" ref={sectionRef}>
      <div className="collage-heading">
        <p>Take A Look!</p>
        <h1>Creative Archive</h1>
      </div>

      <div className="masonry-holder">
        {startMasonry && (
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.08}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.965}
            blurToFocus
          />
        )}
      </div>
    </section>
  );
}

export default Cards;