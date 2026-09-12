import React, { useRef } from 'react';
import TextReveal from './TextReveal';
import { useSectionReveal } from './useHomeMotion';

export default function ChapterHeader({ align, id, label, meta, title, tone = 'light' }) {
  const root = useRef(null);
  const titleLines = Array.isArray(title) ? title : [title];

  useSectionReveal(root);

  return (
    <section
      className={`home-chapter-header home-chapter-header--${align} home-chapter-header--${tone}`}
      id={id}
      ref={root}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
    >
      <div className="home-chapter-meta home-meta">
        <span data-reveal>{label}</span>
        <span data-reveal>{meta}</span>
      </div>
      <h2 className="home-chapter-title" id={`${id}-title`}>
        <TextReveal lines={titleLines} />
      </h2>
    </section>
  );
}
