import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import CircularText from './CircularText';
import { ReactTyped } from 'react-typed';

function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  const scrollToWork = () => {
    document.getElementById('archive')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <LoadingScreen fadeOut={videoReady} />

      <div className="hero-container">
        <button
          className="hero-profile-contact"
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          aria-label="Scroll to contact information"
        >
          <div className="hero-profile-circle">
            <CircularText
              text="LETS CONNECT • LETS CONNECT • "
              onHover="speedUp"
              spinDuration={18}
              className="hero-circular-text"
            />

            <img
              src="/images/me/me-13.jpg"
              alt="Sana Shahzad"
              className="hero-profile-photo"
            />
          </div>
        </button>
        
        <video
          src="/videos/video-wave.mp4"
          poster="/images/video-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
        />

        <div className="hero-overlay"></div>

        <h1>SANA SHAHZAD</h1>

        <ReactTyped
          className="typed-text"
          strings={[
            'Game Developer',
            'Graphic Designer',
            'Photographer',
            'Software Developer',
            'Creative Thinker',
            'Exploring Digital Depths',
          ]}
          typeSpeed={80}
          backSpeed={50}
          loop
        />

        <div className="hero-btns">
          <Button
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={scrollToWork}
          >
            VIEW MY WORK
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;