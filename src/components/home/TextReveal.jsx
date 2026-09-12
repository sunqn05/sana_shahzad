import React from 'react';

// Semantic headings stay in the caller. Each line has its own clipping mask;
// useSectionReveal provides the shared ScrollTrigger animation and cleanup.
export default function TextReveal({ children, lines, className = '', delay = 0 }) {
  return (
    <span className={`home-text-reveal ${className}`} data-text-reveal data-reveal-delay={delay}>
      {(lines || [children]).map((line, index) => (
        <span className="home-mask" key={index}>
          <span className="home-reveal-inner" data-reveal-line>{line}</span>
        </span>
      ))}
    </span>
  );
}
