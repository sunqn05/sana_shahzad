import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./homeData";
import AnimatedSectionHeader from "./AnimatedSectionHeader";
import { useSectionHeaderMotion, useSectionReveal } from "./useHomeMotion";

export default function ProjectsSection() {
  const root = useRef(null);

  useSectionReveal(root);
  useSectionHeaderMotion(root);

  return (
    <section
      className="home-sheet home-projects"
      id="projects"
      tabIndex={-1}
      ref={root}
      aria-labelledby="home-projects-title"
    >
      <AnimatedSectionHeader
        description={
          <>
            A few things I’ve built,
            <br />
            designed, and explored.
          </>
        }
        id="home-projects-title"
        label="03 / SELECTED WORK"
        lines={['Projects.', 'Ideas made real.']}
        meta="SOFTWARE / WEB / INTERACTIVE"
        variant="parallax"
      />

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
