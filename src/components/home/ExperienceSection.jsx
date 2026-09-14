import React, { useRef } from 'react';
import { experience } from './homeData';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

function ExperienceCard({ item, index }) {
  return (
    <article className="home-experience-card">
      <div className="home-experience-banner" aria-hidden="true">
        <img
          src="/images/video-poster.png"
          alt=""
          loading="lazy"
          width="572"
          height="448"
        />
      </div>
      <div className="home-experience-content">
        <div className="home-card-top home-meta"><span>{String(index + 1).padStart(2, '0')} / {item.category}</span><span aria-hidden="true">♡</span></div>
        <p className="home-experience-dates">{item.dates}</p><h3>{item.role}</h3><p className="home-organization">{item.organization}</p>
        <p className="home-experience-description">{item.description}</p>
        <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const root = useRef(null);
  useSectionReveal(root);
  return (
    <section className="home-sheet home-section home-experience" id="experience" ref={root} tabIndex={-1} aria-labelledby="experience-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>04 / EXPERIENCE ♡</span><span>GROWING THROUGH DOING</span>
      </div>
      <h2 className="home-section-title home-section-title--right" id="experience-title">
        <TextReveal>Experience</TextReveal>
      </h2>
      <div className="home-experience-grid">{experience.map((item, index) => <div data-card key={item.organization}><ExperienceCard item={item} index={index} /></div>)}</div>
    </section>
  );
}
