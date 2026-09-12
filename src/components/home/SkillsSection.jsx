import React, { useRef } from 'react';
import { skills } from './homeData';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

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
    <section className="home-sheet home-skills" id="skills" tabIndex={-1} ref={root} aria-labelledby="home-skills-title">
      <div className="home-section-top home-meta" data-reveal><span>02 / TOOLKIT</span><span>THE THINGS I WORK WITH</span></div>
      <div className="home-section-intro">
        <h2 className="home-content-heading" id="home-skills-title"><TextReveal lines={['Skills.', 'The stack.']} /></h2>
        <p data-reveal>Technology.<br />Systems. Design.</p>
      </div>
      <div className="home-skills-grid">{skills.map((skill, index) => <div data-card key={skill.title}><SkillCard skill={skill} index={index} /></div>)}</div>
    </section>
  );
}
