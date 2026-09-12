import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motionPreferenceQuery = '(prefers-reduced-motion: no-preference)';

// Shared vertical entrance system for masked typography, supporting copy,
// cards, and images. The opening hero remains immediate; every later element
// reveals when it reaches the viewport.
export function useSectionReveal(ref) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(motionPreferenceQuery, () => {
      const section = ref.current;
      if (!section) return undefined;

      const revealContext = gsap.context(() => {
        const select = gsap.utils.selector(section);
        const isOpeningPanel = section.hasAttribute('data-reveal-root');
        const triggerFor = element => (isOpeningPanel ? undefined : {
          trigger: element,
          start: 'top 85%',
          once: true,
        });

        select('[data-text-reveal]').forEach(group => {
          gsap.from(group.querySelectorAll('[data-reveal-line]'), {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            delay: Number(group.dataset.revealDelay) || 0,
            scrollTrigger: triggerFor(group),
          });
        });
        select('[data-reveal]').forEach(element => {
          gsap.from(element, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: triggerFor(element),
          });
        });
        select('[data-card]').forEach((element, index) => {
          gsap.from(element, {
            y: 48,
            opacity: 0,
            duration: 0.75,
            delay: (index % 3) * 0.06,
            ease: 'power3.out',
            scrollTrigger: triggerFor(element),
          });
        });
        select('[data-image-reveal]').forEach(element => {
          gsap.from(element, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: triggerFor(element),
          });
        });
      }, section);

      return () => revealContext.revert();
    }, ref);
    return () => media.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
