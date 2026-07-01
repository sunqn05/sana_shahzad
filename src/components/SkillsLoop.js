import React from "react";
import "./SkillsLoop.css";

const skills = [
  ["Python", "devicon-python-plain colored"],
  ["Java", "devicon-java-plain colored"],
  ["C#", "devicon-csharp-plain colored"],
  ["C", "devicon-c-plain colored"],
  ["JavaScript", "devicon-javascript-plain colored"],
  ["HTML", "devicon-html5-plain colored"],
  ["CSS", "devicon-css3-plain colored"],
  ["Git", "devicon-git-plain colored"],
  ["GitHub", "devicon-github-original"],
  ["Linux", "devicon-linux-plain colored"],
  ["Visual Studio", "devicon-visualstudio-plain colored"],
  ["PyCharm", "devicon-pycharm-plain colored"],
  ["JetBrains", "devicon-jetbrains-plain colored"],
  ["IntelliJ", "devicon-intellij-plain colored"],
  ["Photoshop", "devicon-photoshop-plain colored"],
  ["Illustrator", "devicon-illustrator-plain colored"],
  ["Maya", "devicon-maya-plain colored"],
  ["Unity", "devicon-unity-plain colored"],
];

function SkillsLoop() {
  return (
    <section className="skills-loop-section">
      <div className="skills-track">
        {[...skills, ...skills].map(([name, icon], index) => (
          <div className="skill-pill" key={index}>
            <i className={icon}></i>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsLoop;