import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { profile } from './homeData';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

export default function HomeContact() {
  const root = useRef(null);
  useSectionReveal(root);
  return (
    <footer className="home-sheet home-contact" id="contact" tabIndex={-1} ref={root} aria-labelledby="home-contact-title">
      <div className="home-section-top home-meta" data-reveal><span>06 / GET IN TOUCH ♡</span><span>EVERY GOOD IDEA STARTS WITH A CONVERSATION</span></div>
      <h2 className="home-display" id="home-contact-title"><TextReveal lines={['Let’s build something', <em>meaningful ♡</em>]} /></h2>
      <div className="home-contact-links" data-reveal><a className="home-contact-email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
        <div className="home-contact-socials"><a className="home-text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a className="home-text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="home-text-link" href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a><Link className="home-text-link" to="/gallery">Gallery ↗</Link></div>
      </div>
      <div className="home-footer-bottom home-meta"><span>© {new Date().getFullYear()} SANA SHAHZAD</span><span>TORONTO, CANADA</span><a href="#home-main">BACK TO TOP ↑</a></div>
    </footer>
  );
}
