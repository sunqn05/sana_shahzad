import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motionPreferenceQuery = '(prefers-reduced-motion: no-preference)';
const mobileQuery = '(max-width: 600px)';
const tabletQuery = '(max-width: 900px)';
const revealStart = 'top 78%';

// Shared vertical entrance system for masked typography, supporting copy,
// cards, and images. The opening hero remains immediate; every later element
// reveals when it reaches the viewport.
export function useSectionReveal(ref) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    const media = gsap.matchMedia();
    media.add(motionPreferenceQuery, () => {
      const revealContext = gsap.context(() => {
        const select = gsap.utils.selector(section);
        const isOpeningPanel = section.hasAttribute('data-reveal-root');
        const isSkills = section.classList.contains('home-skills');
        const isProjects = section.classList.contains('home-projects');
        const isExperience = section.classList.contains('home-experience');
        const hasCustomCardEntrance = isSkills || isProjects || isExperience;
        const isMobile = window.matchMedia(mobileQuery).matches;
        const isTablet = !isMobile && window.matchMedia(tabletQuery).matches;
        const triggerFor = (element, start = revealStart) => (isOpeningPanel ? undefined : {
          trigger: element,
          start,
          once: true,
          invalidateOnRefresh: true,
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
            y: 26,
            opacity: 0,
            duration: 0.75,
            delay: isOpeningPanel ? 0 : 0.08,
            ease: 'power3.out',
            scrollTrigger: triggerFor(element),
            clearProps: 'transform,opacity',
          });
        });

        if (!hasCustomCardEntrance) {
          select('[data-card]').forEach((element, index) => {
            gsap.from(element, {
              y: 48,
              opacity: 0,
              duration: 0.8,
              delay: 0.1 + (index % 3) * 0.06,
              ease: 'power3.out',
              scrollTrigger: triggerFor(element),
              clearProps: 'transform,opacity',
            });
          });
        }

        if (!isSkills) {
          select('[data-image-reveal]').forEach(element => {
            gsap.from(element, {
              clipPath: 'inset(100% 0% 0% 0%)',
              duration: 0.9,
              delay: 0.08,
              ease: 'power3.out',
              scrollTrigger: triggerFor(element),
              clearProps: 'clipPath',
            });
          });
        }

        if (isSkills) {
          const composition = select('.home-skills-composition')[0];
          const ocean = select('.home-skills-ocean')[0];
          const leftCards = select('.home-skills-column--left > [data-card]');
          const rightCards = select('.home-skills-column--right > [data-card]');

          if (isMobile) {
            if (ocean) {
              gsap.from(ocean, {
                scaleY: 0.94,
                opacity: 0,
                transformOrigin: 'center center',
                duration: 0.75,
                delay: 0.08,
                ease: 'power3.out',
                scrollTrigger: triggerFor(ocean, 'top 82%'),
                clearProps: 'transform,opacity',
              });
            }

            [...leftCards, ...rightCards].forEach(card => {
              gsap.from(card, {
                y: 34,
                opacity: 0,
                duration: 0.7,
                delay: 0.08,
                ease: 'power3.out',
                scrollTrigger: triggerFor(card, 'top 82%'),
                clearProps: 'transform,opacity',
              });
            });
          } else if (composition) {
            const distance = isTablet ? 56 : 100;
            const timeline = gsap.timeline({
              delay: 0.1,
              scrollTrigger: triggerFor(composition),
            });

            if (ocean) {
              timeline.from(ocean, {
                scaleY: 0.86,
                opacity: 0,
                transformOrigin: 'center center',
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }, 0);
            }

            timeline
              .from(leftCards, {
                x: -distance,
                opacity: 0,
                duration: 0.9,
                stagger: 0.13,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }, 0.12)
              .from(rightCards, {
                x: distance,
                opacity: 0,
                duration: 0.9,
                stagger: 0.13,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }, 0.12);
          }
        }

        if (isProjects) {
          const projectGrid = select('.home-projects-grid')[0];
          const projectCards = select('.home-projects-grid > [data-card]');

          if (isMobile) {
            projectCards.forEach(card => {
              gsap.from(card, {
                y: 38,
                opacity: 0,
                duration: 0.72,
                delay: 0.1,
                ease: 'power3.out',
                scrollTrigger: triggerFor(card, 'top 82%'),
                clearProps: 'transform,opacity',
              });
            });
          } else if (projectGrid) {
            gsap.from(projectCards, {
              y: isTablet ? 52 : 64,
              opacity: 0,
              duration: 0.9,
              delay: 0.16,
              stagger: 0.22,
              ease: 'power3.out',
              scrollTrigger: triggerFor(projectGrid),
              clearProps: 'transform,opacity',
            });
          }
        }

        if (isExperience) {
          const experienceGrid = select('.home-experience-grid')[0];
          const experienceCards = select('.home-experience-grid > [data-card]');

          if (isMobile) {
            experienceCards.forEach(card => {
              gsap.from(card, {
                y: 34,
                opacity: 0,
                duration: 0.7,
                delay: 0.08,
                ease: 'power3.out',
                scrollTrigger: triggerFor(card, 'top 82%'),
                clearProps: 'transform,opacity',
              });
            });
          } else if (experienceGrid) {
            const distance = isTablet ? 36 : 52;
            gsap.from(experienceCards, {
              x: index => (index % 2 === 0 ? -distance : distance),
              opacity: 0,
              duration: 0.85,
              delay: 0.12,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: triggerFor(experienceGrid),
              clearProps: 'transform,opacity',
            });
          }
        }
      }, section);

      return () => revealContext.revert();
    }, ref);
    return () => media.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
