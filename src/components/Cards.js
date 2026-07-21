import { Link } from "react-router-dom";
import "./Cards.css";

function Cards() {
  const topImages = [
    "/images/me/me-1.jpg",
    "/images/me/me-2.jpg",
    "/images/me/me-3.jpg",
    "/images/me/me-4.jpeg",
    "/images/me/me-5.jpg",
    "/images/me/me-6.jpg",
    "/images/me/me-14.jpg",
  ];

  const bottomImages = [
    "/images/me/me-7.jpeg",
    "/images/me/me-8.jpeg",
    "/images/me/me-9.jpg",
    "/images/me/me-10.jpg",
    "/images/me/me-11.jpg",
    "/images/me/me-12.jpg",
  ];

  const links = [
    { title: "Photography", path: "/gallery#photography" },
    { title: "Graphic Design", path: "/gallery#design" },
    { title: "Projects", path: "/projects" },
    { title: "About Me", path: "/about" },
  ];

  return (
    <section className="cards-section" id="archive">
        <div className="archive-heading">
        <h1>Creative Archive</h1>
      </div>

      <div className="flow-row flow-row-left">
        <div className="flow-track">
        {[...topImages, ...topImages, ...topImages].map((img, index) => (
          <img src={img} alt="" key={`top-${index}`} />
        ))}
        </div>
      </div>

      <div className="flow-row flow-row-right">
        <div className="flow-track">
          {[...bottomImages, ...bottomImages, ...bottomImages].map((img, index) => (
            <img src={img} alt="" key={`bottom-${index}`} />
          ))}
        </div>
      </div>

      <div className="archive-links">
        {links.map((item, index) => (
          <Link to={item.path} className="archive-link" key={item.title}>
            <span>0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>Explore →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Cards;