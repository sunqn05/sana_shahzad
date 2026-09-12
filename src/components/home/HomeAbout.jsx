import React, { useRef } from 'react';
import AnimatedSectionHeader from './AnimatedSectionHeader';
import { useSectionHeaderMotion, useSectionReveal } from './useHomeMotion';

export default function HomeAbout() {
  const root = useRef(null);
  useSectionReveal(root);
  useSectionHeaderMotion(root);
  return (
    <section className="home-sheet home-about" id="about" ref={root} tabIndex={-1} aria-labelledby="home-about-title">
      <AnimatedSectionHeader
        headingClass="home-display"
        id="home-about-title"
        label="01 / ABOUT"
        lines={['A little', 'about me.']}
        meta="A LITTLE CONTEXT"
        variant="split-subtle"
      >
      <div className="home-about-grid">
        <div>
          <div className="home-about-copy" data-reveal>
            <p className="home-lead">A developer’s mindset.<br />A creative point of view.</p>
            <p>I’m Sana, a Computer Science student at the University of Toronto, with minors in Mathematical Sciences and Game Studies.</p>
            <p>I enjoy turning ideas into software that’s useful, thoughtful, and personal. My interests span systems programming, web development, and interactive experiences.</p>
          </div>
        </div>
        <figure className="home-about-figure" data-image-reveal>
          <div className="home-about-image"><img src="/images/about/about-11.jpg" alt="Sana Shahzad" loading="lazy" width="720" height="900" /></div>
          <figcaption className="home-meta"><span>SANA SHAHZAD</span><span>DEVELOPER & CREATIVE</span></figcaption>
        </figure>
      </div>
      <div className="home-about-foot home-meta" data-reveal><span>COMPUTER SCIENCE</span><span>MATHEMATICAL SCIENCES</span><span>GAME STUDIES</span></div>
      </AnimatedSectionHeader>
    </section>
  );
}
