import React, { useRef } from 'react';
import { experience } from './homeData';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

function ExperienceCard({ item, index }) {
  return (
    <article className="home-experience-card">
      <div className="home-card-top home-meta"><span>{String(index + 1).padStart(2, '0')} / {item.category}</span><span aria-hidden="true">♡</span></div>
      <p className="home-experience-dates">{item.dates}</p><h3>{item.role}</h3><p className="home-organization">{item.organization}</p>
      <p className="home-experience-description">{item.description}</p>
      <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
    </article>
  );
}

export default function ExperienceSection() {
  const root = useRef(null);
  useSectionReveal(root);
  return (
    <section className="home-sheet home-experience" id="experience" tabIndex={-1} ref={root} aria-labelledby="home-experience-title">
      <div className="home-section-top home-meta" data-reveal><span>04 / EXPERIENCE</span><span>PEOPLE, IDEAS & IMPACT</span></div>
      <div className="home-section-intro"><h2 className="home-content-heading" id="home-experience-title"><TextReveal>Growing through doing.</TextReveal></h2><p data-reveal>Sharing what I know.<br />Learning from the people around me.</p></div>
      <div className="home-experience-grid">{experience.map((item, index) => <div data-card key={item.organization}><ExperienceCard item={item} index={index} /></div>)}</div>
    </section>
  );
}
