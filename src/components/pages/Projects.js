import React from "react";
import "../../App.css";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      tools: "React • CSS • JavaScript",
      description: "A personal portfolio built with React, and an ocean-inspired visual identity.",
      github: "https://github.com/sunqn05/sana_shahzad",
    },
    {
      title: "Python Projects",
      tools: "Python",
      description: "Small coding projects, practice files, and experiments from my computer science learning.",
      github: "https://github.com/wandering3ngineer/courses",
    },
    {
      title: "Game Development",
      tools: "C# • Backend • Frontend",
      description: "Design-focused coding experiments and all rounded projects.",
      github: "https://github.com/damhahlat/Battleship-2.0",
    },
  ];

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <p className="projects-label">Coding Portfolio</p>
        <h1>Projects</h1>
        <p>
          A small collection of things I’ve built and experimented with
          while learning software, web and game development!
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