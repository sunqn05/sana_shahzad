import React, { useRef } from 'react';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

export default function HomeAbout() {
  const root = useRef(null);
  useSectionReveal(root);
  return (
    <section className="home-sheet home-section home-about" id="about" ref={root} tabIndex={-1} aria-labelledby="about-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>01 / ABOUT ♡</span><span>A LITTLE CONTEXT</span>
      </div>
      <div className="home-about-grid">
        <div className="home-about-editorial">
          <h2 className="home-section-title home-section-title--left" id="about-title">
            <TextReveal>About me</TextReveal>
          </h2>
          <div className="home-about-copy" data-reveal>
            <p className="home-lead">A developer’s mindset with a creative point of view. ♡</p>
            <p>I’m Sana Shahzad, a Computer Science student at the University of Toronto, with minors in Mathematical Sciences and Game Studies.</p>
            <p>I enjoy turning ideas into software that’s useful, thoughtful, and personal. My interests span systems programming, web development, and interactive experiences.</p>
          </div>
        </div>
        <figure className="home-about-figure" data-image-reveal>
          <div className="home-about-image"><img src="/images/about/about-11.jpg" alt="Sana Shahzad" loading="lazy" width="720" height="900" /></div>
          <figcaption className="home-meta"><span>SANA SHAHZAD</span><span>♡ DEVELOPER & CREATIVE</span></figcaption>
        </figure>
      </div>
      <div className="home-about-foot home-meta" data-reveal>
        <span>COMPUTER SCIENCE</span>
        <span>♡</span>
        <span>MATHEMATICAL SCIENCES</span>
        <span>♡</span>
        <span>GAME STUDIES</span>
      </div>
    </section>
  );
}
