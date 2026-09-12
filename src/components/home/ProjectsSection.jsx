import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./homeData";
import { useSectionReveal } from "./useHomeMotion";
import TextReveal from "./TextReveal";

export default function ProjectsSection() {
  const root = useRef(null);

  useSectionReveal(root);

  return (
    <section
      className="home-sheet home-projects"
      id="projects"
      tabIndex={-1}
      ref={root}
      aria-labelledby="home-projects-title"
    >
      <div className="home-section-top home-meta" data-reveal>
        <span>03 / SELECTED WORK</span>
        <span>SOFTWARE / WEB / INTERACTIVE</span>
      </div>

      <div className="home-section-intro">
        <h2
          className="home-content-heading"
          id="home-projects-title"
        >
          <TextReveal lines={['Projects.', 'Ideas made real.']} />
        </h2>

        <p data-reveal>
          A few things I’ve built,
          <br />
          designed, and explored.
        </p>
      </div>

      <div className="home-projects-grid">
        {projects.map((project, index) => (
          <div data-card key={project.id}>
            <ProjectCard
              project={project}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
