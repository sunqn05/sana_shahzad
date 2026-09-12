import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const horizontalHomeQuery = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

const motionPreferenceQuery = '(prefers-reduced-motion: no-preference)';

export function useHorizontalScroll(containerRef, trackRef) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(horizontalHomeQuery, () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return undefined;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          id: 'home-horizontal-scroll',
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(1, distance())}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let refreshFrame;
      const scheduleRefresh = () => {
        window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const resizeObserver = new ResizeObserver(scheduleRefresh);
      resizeObserver.observe(track);
      window.addEventListener('load', scheduleRefresh);
      document.fonts?.ready.then(scheduleRefresh);
      scheduleRefresh();

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        resizeObserver.disconnect();
        window.removeEventListener('load', scheduleRefresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => media.revert();
  }, [containerRef, trackRef]);
}

export function scrollToHomeSection(id, behavior = 'smooth') {
  const target = document.getElementById(id);
  if (!target) return false;

  const horizontalTrigger = ScrollTrigger.getById('home-horizontal-scroll');
  const track = target.closest('.home-horizontal-track');

  if (horizontalTrigger && track) {
    const horizontalDistance = Math.max(1, track.scrollWidth - window.innerWidth);
    const progress = Math.min(1, Math.max(0, target.offsetLeft / horizontalDistance));
    const scrollPosition = horizontalTrigger.start
      + progress * (horizontalTrigger.end - horizontalTrigger.start);
    window.scrollTo({ top: scrollPosition, left: 0, behavior });
  } else {
    target.scrollIntoView({ behavior, block: 'start' });
  }

  return true;
}

function createEntryTrigger(element, horizontalAnimation) {
  if (horizontalAnimation) {
    return {
      trigger: element,
      containerAnimation: horizontalAnimation,
      start: 'left 88%',
      once: true,
    };
  }

  return {
    trigger: element,
    start: 'top 85%',
    once: true,
  };
}

// The same reveal vocabulary is rebuilt for horizontal and vertical layouts.
// Horizontal entries are tied to the one pinned track tween with
// containerAnimation; the child triggers themselves are inexpensive and do
// not scrub.
export function useSectionReveal(ref) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      horizontal: horizontalHomeQuery,
      motionAllowed: motionPreferenceQuery,
    }, context => {
      if (!context.conditions.motionAllowed) return undefined;

      const section = ref.current;
      if (!section) return undefined;

      let revealContext;
      const frame = window.requestAnimationFrame(() => {
        revealContext = gsap.context(() => {
          const select = gsap.utils.selector(section);
          const horizontalAnimation = context.conditions.horizontal
            ? ScrollTrigger.getById('home-horizontal-scroll')?.animation
            : null;
          const isOpeningPanel = section.hasAttribute('data-reveal-root');
          const triggerFor = element => (isOpeningPanel
            ? undefined
            : createEntryTrigger(element, horizontalAnimation));

          select('[data-text-reveal]').forEach(group => {
            gsap.from(group.querySelectorAll('[data-reveal-line]'), {
              yPercent: 110,
              xPercent: horizontalAnimation ? 6 : 0,
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
              x: horizontalAnimation ? 24 : 0,
              y: horizontalAnimation ? 0 : 30,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: triggerFor(element),
            });
          });
          select('[data-card]').forEach(element => {
            gsap.from(element, {
              x: horizontalAnimation ? 34 : 0,
              y: horizontalAnimation ? 14 : 50,
              opacity: 0,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: triggerFor(element),
            });
          });
          select('[data-image-reveal]').forEach(element => {
            gsap.from(element, {
              clipPath: horizontalAnimation
                ? 'inset(0% 100% 0% 0%)'
                : 'inset(100% 0% 0% 0%)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: triggerFor(element),
            });
          });
        }, section);
      });

      return () => {
        window.cancelAnimationFrame(frame);
        revealContext?.revert();
      };
    }, ref);
    return () => media.revert();
  }, [ref]);
}

export { gsap, ScrollTrigger };
