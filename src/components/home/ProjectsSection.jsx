import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./homeData";
import { useSectionReveal } from "./useHomeMotion";

export default function ProjectsSection() {
  const root = useRef(null);

  useSectionReveal(root);

  return (
    <section
      className="home-sheet home-chapter-content home-projects"
      id="projects-content"
      ref={root}
      aria-labelledby="projects-title"
    >
      <div className="home-content-label home-meta" data-reveal>
        <span>03 / PROJECTS</span><span>SOFTWARE / WEB / INTERACTIVE</span>
      </div>
      <div className="home-projects-grid">
        {projects.map((project, index) => (
          <div data-card key={project.id}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
