import React from 'react';
import TextReveal from './TextReveal';

export default function AnimatedSectionHeader({
  description,
  headingClass = 'home-content-heading',
  id,
  label,
  lines,
  meta,
  variant,
}) {
  const isSplit = variant.startsWith('split');
  const splitLabel = lines.join(' ');
  const splitMode = variant === 'split' ? 'horizontal' : variant === 'split-side' ? 'vertical-asymmetric' : 'vertical';
  const firstHalfClass = splitMode === 'horizontal' ? 'split-half-left' : 'split-half-top';
  const secondHalfClass = splitMode === 'horizontal' ? 'split-half-right' : 'split-half-bottom';

  return (
    <header
      className={`home-motion-header home-motion-header--${variant}${isSplit ? ` split-screen-section split-screen-section--${splitMode}` : ''}`}
      data-motion-header
      data-motion-variant={variant}
    >
      <div className="home-section-top home-meta" data-header-meta>
        <span data-reveal>{label}</span>
        <span data-reveal>{meta}</span>
      </div>

      {isSplit && (
        <div className="split-screen-layer" aria-hidden="true">
          <div className={`split-half ${firstHalfClass}`} data-split-panel="first">
            <div className="split-half-content"><span>{splitLabel}</span></div>
          </div>
          <div className={`split-half ${secondHalfClass}`} data-split-panel="second">
            <div className="split-half-content"><span>{splitLabel}</span></div>
          </div>
        </div>
      )}

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
    </header>
  );
}
