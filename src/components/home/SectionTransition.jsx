import React, { useLayoutEffect, useRef } from 'react';
import { gsap, useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

export default function SectionTransition({ title, number, label, note, variant }) {
  const root = useRef(null);
  useSectionReveal(root);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const panel = root.current;
      const incomingSheet = panel?.nextElementSibling;

      if (!panel || !incomingSheet) return undefined;

      const heading = panel.querySelector('.home-transition-heading');
      const background = panel.querySelector('.home-transition-background');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: incomingSheet,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(incomingSheet, { y: 48 }, { y: 0, ease: 'none' }, 0)
        .fromTo(panel, { scale: 1, filter: 'brightness(1)' }, {
          scale: 0.96,
          filter: 'brightness(0.9)',
          transformOrigin: 'center top',
          ease: 'none',
        }, 0)
        .to(heading, { y: -24, ease: 'none' }, 0)
        .to(background, { scale: 1.04, yPercent: -2, ease: 'none' }, 0);

      return () => timeline.kill();
    }, root);
    return () => media.revert();
  }, [variant]);
  return (
    <section className={`home-transition home-transition-${variant}`} ref={root} aria-labelledby={`transition-${variant}`}>
      <div className="home-transition-background" aria-hidden="true" />
      <div className="home-transition-top home-meta" data-reveal><span>{number} / {label}</span><span>SANA SHAHZAD - PORTFOLIO</span></div>
      <h2 className="home-transition-heading" id={`transition-${variant}`}><TextReveal>{title}</TextReveal></h2>
      <div className="home-transition-bottom home-meta" data-reveal><span>{note}</span><span>KEEP EXPLORING <span className="home-scroll-arrow" aria-hidden="true">↓</span></span></div>
    </section>
  );
}
