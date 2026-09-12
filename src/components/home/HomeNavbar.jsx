import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap, scrollToHomeSection } from './useHomeMotion';
import './HomeNavbar.css';

const homeSections = ['About', 'Skills', 'Projects', 'Experience', 'Archive'];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const location = useLocation();
  const routerNavigate = useNavigate();
  const isHome = location.pathname === '/';

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

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const onPointerDown = event => {
      if (root.current && !root.current.contains(event.target)) setOpen(false);
    };
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

  const goToHomeSection = (event, id) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    if (!isHome) {
      event.preventDefault();
      routerNavigate(id === 'home-main' ? '/' : `/#${id}`);
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      window.history.pushState(null, '', `#${id}`);
      target.focus({ preventScroll: true });
      scrollToHomeSection(
        id,
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      );
    }
  };

  const mainId = isHome ? 'home-main' : 'gallery-main';

  return (
    <header
      className={`home-nav${scrolled ? ' home-nav-scrolled' : ''}${open ? ' home-nav-open' : ''}`}
      ref={root}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    >
      <a className="home-skip-link" href={`#${mainId}`}>Skip to content</a>
      <nav aria-label="Main navigation">
        <a
          className="home-nav-logo"
          href={isHome ? '#home-main' : '/'}
          aria-label="Sana Shahzad, back to home"
          onClick={event => goToHomeSection(event, 'home-main')}
        >
          S . S
        </a>
        <button
          className="home-nav-toggle"
          type="button"
          ref={toggle}
          aria-expanded={open}
          aria-controls="home-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <ul id="home-navigation" className="home-nav-links">
          {homeSections.map(label => {
            const id = label.toLowerCase();
            return (
              <li key={label}>
                <a href={isHome ? `#${id}` : `/#${id}`} onClick={event => goToHomeSection(event, id)}>{label}</a>
              </li>
            );
          })}
          <li><Link to="/gallery" aria-current={location.pathname === '/gallery' ? 'page' : undefined}>Gallery</Link></li>
          <li><a href={isHome ? '#contact' : '/#contact'} onClick={event => goToHomeSection(event, 'contact')}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
