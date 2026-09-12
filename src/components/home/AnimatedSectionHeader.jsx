import React from 'react';
import TextReveal from './TextReveal';

export default function AnimatedSectionHeader({
  children,
  description,
  headingClass = 'home-content-heading',
  id,
  label,
  lines,
  meta,
  splitLines,
  variant,
}) {
  const isSplit = variant.startsWith('split');
  const transitionLines = splitLines || lines;

  const splitTitle = (
    <div className="split-title-composition">
      <span className="split-title" role="presentation">
        {transitionLines.map(line => <span className="split-title-line" key={line}>{line}</span>)}
      </span>
    </div>
  );

  return (
    <header
      className={`home-motion-header home-motion-header--${variant}${isSplit ? ' split-screen-section' : ''}`}
      data-motion-header
      data-motion-variant={variant}
    >
      <div className="home-section-top home-meta" data-header-meta>
        <span data-reveal>{label}</span>
        <span data-reveal>{meta}</span>
      </div>

      {isSplit && <h2 className="home-visually-hidden" id={id}>{lines.join(' ')}</h2>}

      {isSplit && (
        <div className="split-screen-layer" aria-hidden="true">
          <div className="split-half split-half-top" data-split-panel="first">
            {splitTitle}
          </div>
          <div className="split-half split-half-bottom" data-split-panel="second">
            {splitTitle}
          </div>
        </div>
      )}

      {isSplit ? (
        <div className="home-motion-header-stage home-split-stage">
          <div className="home-split-content">
            {description && (
              <div className="home-split-support" data-header-description>
                <p data-reveal>{description}</p>
              </div>
            )}
            {children}
          </div>
        </div>
      ) : (
        <div className="home-motion-header-stage">
          <div className="home-motion-header-copy">
            <h2 className={headingClass} id={id} data-header-title>
              <TextReveal lines={lines} />
            </h2>
            {description && (
              <div className="home-motion-header-description" data-header-description>
                <p data-reveal>{description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
