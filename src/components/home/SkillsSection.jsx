import React, { useRef } from 'react';
import { skills } from './homeData';
import AnimatedSectionHeader from './AnimatedSectionHeader';
import { useSectionHeaderMotion, useSectionReveal } from './useHomeMotion';

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
  useSectionHeaderMotion(root);
  return (
    <section className="home-sheet home-skills" id="skills" tabIndex={-1} ref={root} aria-labelledby="home-skills-title">
      <AnimatedSectionHeader
        description={<>Technology.<br />Systems. Design.</>}
        id="home-skills-title"
        label="02 / TOOLKIT"
        lines={['Skills.', 'The stack.']}
        meta="THE THINGS I WORK WITH"
        variant="split"
      />
      <div className="home-skills-grid">{skills.map((skill, index) => <div data-card key={skill.title}><SkillCard skill={skill} index={index} /></div>)}</div>
    </section>
  );
}
