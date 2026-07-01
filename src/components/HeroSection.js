import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import { ReactTyped } from 'react-typed';

function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  const scrollToWork = () => {
    document.getElementById('work').scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      <LoadingScreen fadeOut={videoReady} />

      <div className="hero-container">
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
            'Graphic Designer',
            'Photographer',
            'Coder and Developer',
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