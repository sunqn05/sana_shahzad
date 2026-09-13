import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

const aboutCards = [
  {
    id: 'university-of-toronto',
    title: 'University of Toronto',
    description: 'Computer Science major with minors in Mathematical Sciences and Game Studies.',
    image: '/images/about/about-8.jpg',
    link: null,
  },
  {
    id: 'outside-of-developing',
    title: 'Outside of Developing',
    description: 'Gaming, music, food, painting, and creative exploration outside of code.',
    image: '/images/about/about-5.jpg',
    link: null,
  },
  {
    id: 'current-goals',
    title: 'Current Goals',
    description: 'Building a portfolio that blends development, design, and interactive experiences.',
    image: '/images/about/about-9.jpg',
    link: null,
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Turning ideas into thoughtful software with a strong technical foundation.',
    image: '/images/about/about-3.jpg',
    link: null,
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'An eye for mood, framing, and visual storytelling.',
    image: '/images/about/about-2.jpg',
    link: '/gallery',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Branding, posters, visual identity, and digital design.',
    image: '/images/about/about-4.jpg',
    link: '/gallery',
  },
  {
    id: 'spotify',
    title: 'Spotify',
    description: 'My soundtrack for focus and everyday life.',
    image: '/images/about/about-7.jpg',
    link: "https://open.spotify.com/user/yndm2c0cvt6e8ey7juu5xdjoe?si=53b3657bee0c4e09",
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: 'What I’m watching, learning from, and creating.',
    image: '/images/about/about-12.jpg',
    link: "https://www.youtube.com/@ssunqn",
  },
  {
    id: 'pinterest',
    title: 'Pinterest',
    description: 'A visual moodboard of references, palettes, and ideas.',
    image: '/images/about/about-6.jpg',
    link: "https://pin.it/f8cZK3aUD",
  },
];

export default function HomeAbout() {
  const root = useRef(null);
  const cardGesture = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [focusedCard, setFocusedCard] = useState(null);

  useSectionReveal(root);

  return (
    <section className="home-sheet home-section home-about" id="about" ref={root} tabIndex={-1} aria-labelledby="about-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>01 / ABOUT ♡</span><span>A LITTLE CONTEXT</span>
      </div>

      <div className="home-about-intro">
        <h2 className="home-section-title home-section-title--left" id="about-title">
          <TextReveal>About me</TextReveal>
        </h2>
        <div className="home-about-copy" data-reveal>
          <p className="home-lead">A developer’s mindset with a creative point of view. ♡</p>
          <p>I enjoy turning ideas into software that’s useful, thoughtful, and personal. </p>
        </div>
      </div>

      <div className="home-about-card-gallery" data-reveal>
        {aboutCards.map((card, index) => {
          const isExpanded = focusedCard === index || (focusedCard === null && activeCard === index);
          const descriptionId = `about-card-description-${card.id}`;

          return (
            <article
              className={`home-about-flex-card${isExpanded ? ' is-active' : ''}`}
              key={card.id}
              style={{ '--about-card-offset': `${[0, 10, 4, 12, 2, 9, 0, 11, 5][index]}px` }}
            >
              <button
                className="home-about-flex-card-trigger"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={descriptionId}
                onFocus={() => setFocusedCard(index)}
                onBlur={() => setFocusedCard(null)}
                onPointerDown={event => {
                  if (event.pointerType === 'mouse') return;

                  cardGesture.current = {
                    pointerId: event.pointerId,
                    index,
                    startX: event.clientX,
                    startY: event.clientY,
                    moved: false,
                  };
                }}
                onPointerMove={event => {
                  const gesture = cardGesture.current;
                  if (!gesture || gesture.pointerId !== event.pointerId) return;

                  const distance = Math.hypot(
                    event.clientX - gesture.startX,
                    event.clientY - gesture.startY,
                  );

                  if (distance > 10) gesture.moved = true;
                }}
                onPointerCancel={event => {
                  cardGesture.current = null;
                  event.currentTarget.blur();
                }}
                onPointerUp={event => {
                  if (event.pointerType === 'mouse') return;
                  const gesture = cardGesture.current;
                  cardGesture.current = null;
                  if (!gesture || gesture.pointerId !== event.pointerId || gesture.index !== index || gesture.moved) return;

                  const target = event.currentTarget;
                  setActiveCard(current => current === index ? null : index);
                  target.blur();
                }}
              >
                <img src={card.image} alt="" loading="lazy" draggable="false" />
                <span className="home-about-flex-card-overlay">
                  <span className="home-about-flex-card-title">{card.title}</span>
                  <span className="home-about-flex-card-description" id={descriptionId}>{card.description}</span>
                </span>
              </button>

              {card.link && (card.link.startsWith('/') ? (
                <Link className="home-about-flex-card-link" to={card.link}>
                  Visit {card.title}
                </Link>
              ) : (
                <a className="home-about-flex-card-link" href={card.link} target="_blank" rel="noreferrer">
                  Visit {card.title}
                </a>
              ))}
            </article>
          );
        })}
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
