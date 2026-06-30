import React from "react";
import "../../App.css";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      tools: "React • CSS • JavaScript",
      description: "A personal portfolio built with React, custom styling, and an ocean-inspired visual identity.",
      github: "https://github.com/sunqn05",
    },
    {
      title: "Python Projects",
      tools: "Python",
      description: "Small coding projects, practice files, and experiments from my computer science learning.",
      github: "https://github.com/sunqn05",
    },
    {
      title: "Creative Experiments",
      tools: "Web Design • Frontend",
      description: "Interactive ideas, layouts, and design-focused coding experiments.",
      github: "https://github.com/sunqn05",
    },
  ];

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <p className="projects-label">Coding Portfolio</p>
        <h1>Projects</h1>
        <p>
          A small collection of things I’ve built, tested, and experimented with
          while learning software development.
        </p>
      </section>

      <section className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <p className="project-tools">{project.tools}</p>
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <a href={project.github} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          </div>
        ))}
      </section>

      <div className="github-main-link">
        <a href="https://github.com/sunqn05" target="_blank" rel="noreferrer">
          View All Projects on GitHub
        </a>
      </div>
    </div>
  );
}

export default Projects;