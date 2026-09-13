import React, { useEffect, useRef, useState } from 'react';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

const aboutPanels = [
  {
    title: 'University of Toronto',
    description: 'Computer Science major with minors in Mathematical Sciences and Game Studies.',
    image: '/images/about/about-8.jpg',
    imageAlt: 'Toronto skyline at night',
  },
  {
    title: 'Outside of Developing',
    description: 'I love gaming, music, food, painting, and creative exploration outside of code.',
    image: '/images/about/about-5.jpg',
    imageAlt: 'Coffee, pastries, and a compact camera',
  },
  {
    title: 'Current Goals',
    description: 'Building a portfolio that blends software development, design, and interactive experiences.',
    image: '/images/about/about-9.jpg',
    imageAlt: 'A creative workspace with a laptop and coffee',
  },
  {
    title: 'Photography',
    description: 'A personal interest that inspires my eye for mood, framing, and visual storytelling.',
    image: '/images/about/about-2.jpg',
    imageAlt: 'A camera ready for a photography session',
  },
  {
    title: 'Programming',
    description: 'I enjoy turning ideas into useful, thoughtful software with a strong technical foundation.',
    image: '/images/about/about-3.jpg',
    imageAlt: 'A programming workspace with code on screen',
  },
  {
    title: 'Graphic Design',
    description: 'Branding, posters, visual identity, and digital design are a major part of my creative background.',
    image: '/images/about/about-4.jpg',
    imageAlt: 'Graphic design work in progress on a laptop',
  },
];

export default function HomeAbout() {
  const root = useRef(null);
  const panelStack = useRef(null);
  const [activePanel, setActivePanel] = useState(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useSectionReveal(root);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateInputMode = () => {
      setSupportsHover(query.matches);
      setActivePanel(null);
    };

    updateInputMode();
    query.addEventListener('change', updateInputMode);
    return () => query.removeEventListener('change', updateInputMode);
  }, []);

  useEffect(() => {
    if (supportsHover) return undefined;

    const closeOnOutsideTap = event => {
      if (!panelStack.current?.contains(event.target)) setActivePanel(null);
    };

    document.addEventListener('pointerdown', closeOnOutsideTap);
    return () => document.removeEventListener('pointerdown', closeOnOutsideTap);
  }, [supportsHover]);

  const closeWhenInteractionLeaves = event => {
    if (!supportsHover || event.currentTarget.contains(document.activeElement)) return;
    setActivePanel(null);
  };

  return (
    <section className="home-sheet home-section home-about" id="about" ref={root} tabIndex={-1} aria-labelledby="about-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>01 / ABOUT ♡</span><span>A LITTLE CONTEXT</span>
      </div>
      <div className="home-about-grid">
        <div className="home-about-editorial">
          <h2 className="home-section-title home-section-title--left" id="about-title">
            <TextReveal>About me</TextReveal>
          </h2>
          <div className="home-about-copy" data-reveal>
            <p className="home-lead">A developer’s mindset with a creative point of view. ♡</p>
            <p>I’m Sana Shahzad, a Computer Science student at the University of Toronto, with minors in Mathematical Sciences and Game Studies.</p>
            <p>I enjoy turning ideas into software that’s useful, thoughtful, and personal. My interests span systems programming, web development, and interactive experiences.</p>
          </div>
        </div>

        <div
          className="home-about-panel-stack"
          data-reveal
          ref={panelStack}
          onMouseLeave={closeWhenInteractionLeaves}
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setActivePanel(null);
          }}
        >
          {aboutPanels.map((panel, index) => {
            const isActive = activePanel === index;
            const triggerId = `about-panel-trigger-${index}`;
            const contentId = `about-panel-content-${index}`;

            return (
              <article
                className={`home-about-panel${isActive ? ' is-active' : ''}`}
                key={panel.title}
                onMouseEnter={() => { if (supportsHover) setActivePanel(index); }}
              >
                <button
                  className="home-about-panel-trigger"
                  id={triggerId}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={contentId}
                  onFocus={() => setActivePanel(index)}
                  onClick={() => {
                    if (!supportsHover) setActivePanel(isActive ? null : index);
                  }}
                >
                  {panel.title}
                </button>
                <div
                  className="home-about-panel-body"
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isActive}
                >
                  <div className="home-about-panel-content">
                    <img src={panel.image} alt={panel.imageAlt} loading="lazy" />
                    <p>{panel.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="home-about-foot home-meta" data-reveal>
        <span>COMPUTER SCIENCE</span>
        <span>♡</span>
        <span>MATHEMATICAL SCIENCES</span>
        <span>♡</span>
        <span>GAME STUDIES</span>
      </div>
    </section>
  );
}
