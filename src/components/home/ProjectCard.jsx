import React from "react";

export default function ProjectCard({
  project,
  index,
  isFlipped,
  onToggle,
}) {
  const shouldUseTap = () => (
    window.matchMedia("(max-width: 1024px), (hover: none), (pointer: coarse)").matches
  );

  const handleClick = (event) => {
    if (event.target.closest("a") || !shouldUseTap()) return;
    onToggle(project.id);
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(project.id);
    }
  };

  return (
    <article
      className={`home-project-card${isFlipped ? " is-flipped" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      aria-label={isFlipped
        ? `${project.title}. Project details shown. Press Enter to close.`
        : `${project.title}. Press Enter to show project details.`}
    >
      <div className="home-project-card-inner">
        <div className="home-project-face home-project-front">
          <div className="home-project-image">
            {project.image ? (
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                loading="lazy"
                width="800"
                height="800"
              />
            ) : (
              <span className="home-project-monogram" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>

          <div className="home-project-front-meta home-meta" aria-hidden="true">
            <span>{project.category}</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="home-project-face home-project-back">
          <div className="home-project-card-meta home-meta">
            <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
            <span aria-hidden="true">♡</span>
          </div>

          <div className="home-project-details">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {project.technologies?.length > 0 && (
              <ul className="home-project-technologies" aria-label="Technologies">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}
          </div>

          <a
            className="home-project-cta"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={isFlipped ? 0 : -1}
            aria-label={`${project.linkLabel}: ${project.title}`}
          >
            <span>{project.linkLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
