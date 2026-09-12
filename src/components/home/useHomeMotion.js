import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Visible default styles; matchMedia cleans up on preference and route changes.
export function useSectionReveal(ref) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = ref.current;
      const select = gsap.utils.selector(section);
      // The hero starts on entry as a whole, even when its name is at the bottom.
      // Other sections reveal their text as each block becomes visible.
      const triggerFor = element => ({
        trigger: section.hasAttribute('data-reveal-root') ? section : element,
        start: 'top 85%',
        once: true,
      });
      select('[data-text-reveal]').forEach(group => {
        gsap.from(group.querySelectorAll('[data-reveal-line]'), {
          yPercent: 110, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          delay: Number(group.dataset.revealDelay) || 0,
          scrollTrigger: triggerFor(group),
        });
      });
      select('[data-reveal]').forEach(element => {
        gsap.from(element, {
          y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: triggerFor(element),
        });
      });
      select('[data-card]').forEach((element, index) => {
        gsap.from(element, {
          y: 50, opacity: 0, duration: 0.7, ease: 'power3.out', delay: (index % 3) * 0.06,
          scrollTrigger: triggerFor(element),
        });
      });
      select('[data-image-reveal]').forEach(element => {
        gsap.from(element, {
          clipPath: 'inset(100% 0% 0% 0%)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: triggerFor(element),
        });
      });
    }, ref);
    return () => media.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
