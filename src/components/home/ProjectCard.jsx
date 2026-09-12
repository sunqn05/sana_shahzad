import React from "react";

export default function ProjectCard({
  project,
  index,
}) {
  return (
    <a
      className="home-project-card"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.linkLabel}: ${project.title}`}
    >
      <div className="home-project-image">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            loading="lazy"
            width="800"
            height="550"
          />
        ) : (
          <span
            className="home-project-monogram"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="home-project-details">

        <div className="home-project-card-meta home-meta">
          <span>
            {String(index + 1).padStart(2, "0")}
            {" / "}
            {project.category}
          </span>

          <span
            className="home-project-arrow"
            aria-hidden="true"
          >
            ♡
          </span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        {project.technologies?.length > 0 && (
          <ul className="home-project-technologies">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}

        <div className="home-project-cta">
          <span>{project.linkLabel}</span>
          <span aria-hidden="true">↗</span>
        </div>

      </div>
    </a>
  );
}