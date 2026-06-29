import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>

        <div className='footer-link-wrapper'>

          <div className='footer-link-items'>
            <h2>About Me</h2>
            <Link to='/about'>Who Am I?</Link>
          </div>

          <div className='footer-link-items'>
            <h2>Explore</h2>
            <Link to='/gallery'>Gallery</Link>
            <Link to='/projects'>Projects</Link>
            <Link to='/about'>About</Link>
          </div>

        </div>

        <div className='footer-link-wrapper'>

          <div className='footer-link-items'>
            <h2>Social Media</h2>

            <a
              href='https://www.instagram.com/ssana_05/'
              target='_blank'
              rel='noreferrer'
            >
              Instagram
            </a>

            <a
              href='http://linkedin.com/in/sana-shahzad-01726328b'
              target='_blank'
              rel='noreferrer'
            >
              LinkedIn
            </a>

            <a
              href='https://github.com/sunqn05'
              target='_blank'
              rel='noreferrer'
            >
              GitHub
            </a>

          </div>

        </div>

      </div>

      <section className='social-media'>
        <div className='social-media-wrap'>

          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              SANA SHAHZAD
            </Link>
          </div>

          <small className='website-rights'>
            SANA SHAHZAD © 2026
          </small>

          <div className='social-icons'>

            <a
              className='social-icon-link instagram'
              href='https://www.instagram.com/ssana_05/'
              target='_blank'
              rel='noreferrer'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>

            <a
              className='social-icon-link linkedin'
              href='http://linkedin.com/in/sana-shahzad-01726328b'
              target='_blank'
              rel='noreferrer'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </a>

            <a
              className='social-icon-link github'
              href='https://github.com/sunqn05'
              target='_blank'
              rel='noreferrer'
              aria-label='GitHub'
            >
              <i className='fab fa-github' />
            </a>

          </div>

        </div>
      </section>
    </div>
  );
}

export default Footer;