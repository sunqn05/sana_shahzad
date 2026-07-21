import { Link } from "react-router-dom";
import "./Cards.css";

function Cards() {
  const links = [
    {
      number: "01",
      title: "Photography",
      path: "/gallery#photography",
      image: "/images/me/me-1.jpg",
      text: "Explore Collection",
    },
    {
      number: "02",
      title: "Graphic Design",
      path: "/gallery#design",
      image: "/images/me/me-3.jpg",
      text: "Explore Collection",
    },
    {
      number: "03",
      title: "Projects",
      path: "/projects",
      image: "/images/me/me-5.jpg",
      text: "Explore Projects",
    },
    {
      number: "04",
      title: "About Me",
      path: "/about",
      image: "/images/me/me-7.jpeg",
      text: "Discover More",
    },
  ];

  return (
    <section className="cards-section">
      <div className="work-showcase">
        <div className="work-heading">
          <span>02 — EXPLORE</span>
          <h2>Explore My Work</h2>
        </div>

        <div className="work-panels">
          {links.map((item) => (
            <Link
              to={item.path}
              className="work-panel"
              key={item.title}
            >
              <img
                src={item.image}
                alt=""
                className="work-panel-image"
              />

              <div className="work-panel-overlay" />

              <span className="work-panel-number">
                {item.number}
              </span>

              <div className="work-panel-content">
                <h3>{item.title}</h3>

                <p>
                  {item.text}
                  <span className="work-arrow">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="work-pagination">
          <span className="active" />
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

export default Cards;