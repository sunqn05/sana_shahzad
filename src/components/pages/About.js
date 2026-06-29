import React from 'react';
import '../../App.css';
import './About.css';

function About() {
  return (
    <div className='about-page'>
      <section className='about-hero'>
        <p className='about-label'>ABOUT ME</p>

        <h1>
          Hi, I’m Sana — a creative developer, designer, and photographer.
        </h1>

        <p className='about-intro'>
          I like building things that feel visual, personal, and a little
          unexpected. My work lives somewhere between design, photography,
          code, and creative technology.
        </p>
      </section>

      <section className='about-content'>
        <div className='about-card'>
          <h2>What I Do</h2>
          <p>
            I create digital work through graphic design, photography, web
            development, and interactive experiments. I’m especially interested
            in projects that combine visuals with technology.
          </p>
        </div>

        <div className='about-card'>
          <h2>How I Think</h2>
          <p>
            I’m drawn to mood, detail, colour, and atmosphere. Whether I’m
            designing a poster, editing photos, or coding a website, I care
            about how the final piece feels.
          </p>
        </div>

        <div className='about-card'>
          <h2>What I’m Building</h2>
          <p>
            This portfolio is part of my learning process. I designed and built
            it myself using React, HTML, CSS, and JavaScript, and I’m continuing
            to improve it as I grow.
          </p>
        </div>
      </section>

      <section className='about-footer-note'>
        <h2>Currently exploring:</h2>
        <p>
          creative coding, interactive websites, visual design, photography,
          UI/UX, and projects that feel like experiences.
        </p>
      </section>
    </div>
  );
}

export default About;