import { Link } from "react-router-dom";
import "./Cards.css";

function Cards() {
  const topImages = [
    "/images/img-5.jpg",
    "/images/img-4.jpg",
    "/images/img-3.jpg",
    "/images/img-home.jpg",
    "/images/img-5.jpg",
    "/images/img-4.jpg",
  ];

  const bottomImages = [
    "/images/img-home.jpg",
    "/images/img-3.jpg",
    "/images/img-4.jpg",
    "/images/img-5.jpg",
    "/images/img-home.jpg",
    "/images/img-3.jpg",
  ];

  const links = [
    { title: "Photography", path: "/gallery#photography" },
    { title: "Graphic Design", path: "/gallery#design" },
    { title: "Projects", path: "/projects" },
    { title: "About Me", path: "/about" },
  ];

  return (
    <section className="cards-section" id="work">
      <div className="archive-heading">
        <p>Dive In</p>
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