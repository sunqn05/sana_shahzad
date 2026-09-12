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
      className="home-sheet home-section home-projects"
      id="projects"
      ref={root}
      tabIndex={-1}
      aria-labelledby="projects-title"
    >
      <div className="home-content-label home-meta" data-reveal>
        <span>03 / SELECTED WORK ♡</span><span>SOFTWARE ♡ WEB ♡ INTERACTIVE</span>
      </div>
      <h2 className="home-section-title home-section-title--left" id="projects-title">
        <TextReveal>Projects</TextReveal>
      </h2>
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
