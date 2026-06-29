import React from 'react';
import '../../App.css';
import './About.css';

function About() {
  return (
    <div className='about-page'>
      <section className='about-hero'>
        <p className='about-label'>ABOUT ME</p>

        <h1>
          Hi!, I’m Sana Shahzad a creative developer, designer, and photographer!
        </h1>

        <p className='about-intro'>
          I like building things that feel personal. 
          My work lives somewhere between design, photography,
          code, and creative technology.
        </p>
      </section>

      <section className='about-content'>
        <div className='about-card'>
          <h2>What I Do</h2>
          <p>
            I create digital work through graphic design, photography, web
            development, and interactive projects. I’m especially interested
            in projects that combine visuals with technology.
          </p>
        </div>

        <div className='about-card'>
          <h2>How I Think</h2>
          <p>
            I’m drawn to mood, detail, colour, and atmosphere, 
            and really just how it make you feel.
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
        <h2>It May Not Be Perfect But Its Me:</h2>
      </section>
    </div>
  );
}

export default About;