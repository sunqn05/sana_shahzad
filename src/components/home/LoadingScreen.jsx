import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from './useHomeMotion';
import './LoadingScreen.css';

const heroNameTargets = {
  sana: '.home-hero-name-row--top .home-reveal-inner',
  shahzad: '.home-hero-name-row--bottom .home-reveal-inner',
};

function getDestination(source, selector) {
  const target = document.querySelector(selector);

  if (!source || !target) return { x: 0, y: 0, scale: 1 };

  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  return {
    x: targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2),
    y: targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2),
    scale: sourceRect.width ? targetRect.width / sourceRect.width : 1,
  };
}

export default function LoadingScreen({ onComplete }) {
  const root = useRef(null);
  const sana = useRef(null);
  const shahzad = useRef(null);
  const line = useRef(null);
  const lineFill = useRef(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousScrollRestoration = window.history.scrollRestoration;
    const blockedKeys = new Set(['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' ']);
    let released = false;
    let completed = false;

    const preventScroll = event => event.preventDefault();
    const preventScrollKey = event => {
      if (blockedKeys.has(event.key)) event.preventDefault();
    };
    const holdAtTop = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) window.scrollTo(0, 0);
    };

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    html.classList.add('home-loading-active');
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKey);
    window.addEventListener('scroll', holdAtTop, { passive: true });

    const releasePage = () => {
      if (released) return;
      released = true;
      html.classList.remove('home-loading-active');
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKey);
      window.removeEventListener('scroll', holdAtTop);
    };

    const finish = () => {
      if (completed) return;
      completed = true;
      releasePage();
      onComplete?.();
    };

    const context = gsap.context(() => {
      const words = [sana.current, shahzad.current];
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set(words, { autoAlpha: 0, transformOrigin: '50% 50%' });
      gsap.set(line.current, { autoAlpha: 0 });
      gsap.set(lineFill.current, { scaleX: 0, transformOrigin: 'left center' });

      if (prefersReducedMotion) {
        gsap.set(words, { autoAlpha: 1 });
        gsap.set(line.current, { autoAlpha: 1 });
        gsap.set(lineFill.current, { scaleX: 1 });
        gsap.timeline()
          .to(root.current, {
            autoAlpha: 0,
            duration: 0.32,
            delay: 0.42,
            ease: 'power1.out',
            onComplete: finish,
          });
        return;
      }

      let sanaDestination = { x: 0, y: 0, scale: 1 };
      let shahzadDestination = { x: 0, y: 0, scale: 1 };

      const timeline = gsap.timeline();

      timeline
        .to(words, { autoAlpha: 1, duration: 0.18, ease: 'power1.out' }, 0)
        .to(line.current, { autoAlpha: 1, duration: 0.18, ease: 'power1.out' }, 0.06)
        .to(lineFill.current, { scaleX: 1, duration: 1.35, ease: 'power1.inOut' }, 0.14)
        .to(line.current, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }, 1.34)
        .call(() => {
          window.scrollTo(0, 0);
          sanaDestination = getDestination(sana.current, heroNameTargets.sana);
          shahzadDestination = getDestination(shahzad.current, heroNameTargets.shahzad);
        }, [], 1.43)
        .to(sana.current, {
          x: () => sanaDestination.x,
          y: () => sanaDestination.y,
          scale: () => sanaDestination.scale,
          duration: 0.96,
          ease: 'power3.inOut',
        }, 1.44)
        .to(shahzad.current, {
          x: () => shahzadDestination.x,
          y: () => shahzadDestination.y,
          scale: () => shahzadDestination.scale,
          duration: 0.96,
          ease: 'power3.inOut',
        }, 1.44)
        .to(root.current, {
          autoAlpha: 0,
          duration: 0.38,
          ease: 'power2.inOut',
          onComplete: finish,
        }, 2.28);
    }, root);

    return () => {
      context.revert();
      releasePage();
    };
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={root} role="status" aria-label="Loading portfolio">
      <div className="loading-screen__lockup" aria-hidden="true">
        <span className="loading-screen__word" ref={sana}>SANA</span>
        <span className="loading-screen__word" ref={shahzad}>SHAHZAD</span>
        <span className="loading-screen__line" ref={line}>
          <span className="loading-screen__line-fill" ref={lineFill} />
        </span>
      </div>
    </div>
  );
}
