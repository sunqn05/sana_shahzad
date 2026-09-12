import React, { useRef } from 'react';
import { skills } from './homeData';
import { useSectionReveal } from './useHomeMotion';

function SkillCard({ skill, index }) {
  return (
    <article className="home-skill-card">
      <div className="home-card-top home-meta"><span>{String(index + 1).padStart(2, '0')}</span><span aria-hidden="true">♡</span></div>
      <h3>{skill.title}</h3>
      <ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul>
    </article>
  );
}

export default function SkillsSection() {
  const root = useRef(null);
  useSectionReveal(root);
  return (
    <section className="home-sheet home-chapter-content home-skills" id="skills-content" ref={root} aria-labelledby="skills-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>02 / SKILLS</span><span>TOOLS &amp; TECHNOLOGIES</span>
      </div>
      <div className="home-skills-grid">{skills.map((skill, index) => <div data-card key={skill.title}><SkillCard skill={skill} index={index} /></div>)}</div>
    </section>
  );
}
