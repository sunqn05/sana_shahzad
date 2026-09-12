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

// Reusable scroll moments for section headers. Split overlays are structural
// panels; typography reveals remain owned by useSectionReveal.
export function useSectionHeaderMotion(ref) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = ref.current;
      if (!section) return undefined;

      const motionContext = gsap.context(() => {
        const headers = section.querySelectorAll('[data-motion-header]');

        headers.forEach(header => {
          const variant = header.dataset.motionVariant;
          const title = header.querySelector('[data-header-title]');
          const meta = header.querySelector('[data-header-meta]');
          const description = header.querySelector('[data-header-description]');

          if (variant.startsWith('split')) {
            const firstPanel = header.querySelector('[data-split-panel="first"]');
            const secondPanel = header.querySelector('[data-split-panel="second"]');
            const horizontalSplit = variant === 'split';
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: header,
                start: 'top top',
                end: '+=100%',
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onToggle: self => header.classList.toggle('is-split-pinned', self.isActive),
              },
            });

            timeline
              .to(firstPanel, {
                xPercent: horizontalSplit ? -100 : 0,
                yPercent: horizontalSplit ? 0 : -100,
                ease: 'none',
              }, 0)
              .to(secondPanel, {
                xPercent: horizontalSplit ? 100 : 0,
                yPercent: horizontalSplit ? 0 : 100,
                ease: 'none',
              }, 0);
            return;
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          if (title) timeline.fromTo(title, { yPercent: 16 }, { yPercent: -10, ease: 'none' }, 0);
          if (meta) timeline.fromTo(meta, { y: 18 }, { y: -12, ease: 'none' }, 0);
          if (description) timeline.fromTo(description, { y: 32 }, { y: -16, ease: 'none' }, 0);
        });
      }, section);

      return () => motionContext.revert();
    }, ref);

    return () => media.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
