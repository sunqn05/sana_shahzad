import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from './useHomeMotion';
/* import { profile } from './homeData'; */
import './HomeNavbar.css';

const sections = ['About', 'Skills', 'Projects', 'Experience', 'Archive', 'Contact'];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus(); }
    };
    const onPointerDown = event => { if (!root.current.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.current, { y: -12, opacity: 0, duration: 0.7, ease: 'power2.out' });
    });
    return () => media.revert();
  }, []);

  const navigate = (event, id) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      window.history.pushState(null, '', `#${id}`);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return (
    <header className={`home-nav${scrolled ? ' home-nav-scrolled' : ''}${open ? ' home-nav-open' : ''}`} ref={root}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <a className="home-skip-link" href="#home-main">Skip to content</a>
      <nav aria-label="Main navigation">
        <a
  className="home-nav-logo"
  href="#home-main"
  aria-label="Sana Shahzad, back to top"
  onClick={event => navigate(event, 'home-main')}
>
  S . S
</a>
        <button className="home-nav-toggle" type="button" ref={toggle} aria-expanded={open} aria-controls="home-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span /><span /></button>
        <ul id="home-navigation" className="home-nav-links">
          {sections.map(label => <li key={label}><a href={`#${label.toLowerCase()}`} onClick={event => navigate(event, label.toLowerCase())}>{label}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}

/*
<li><a className="home-nav-resume" href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Resume ↗</a></li>
*/