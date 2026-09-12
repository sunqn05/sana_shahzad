import React, { useLayoutEffect, useRef } from 'react';
import { gsap, useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

export default function SectionTransition({ title, number, label, note, variant }) {
  const root = useRef(null);
  useSectionReveal(root);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ scrollTrigger: { trigger: root.current.parentElement, start: 'top top',
        end: () => `+=${window.innerHeight}`, scrub: 0.8, invalidateOnRefresh: true } })
        .to('.home-transition-heading', { y: -35, ease: 'none' }, 0)
        .to('.home-transition-background', { scale: 1.06, yPercent: -3, ease: 'none' }, 0);
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
