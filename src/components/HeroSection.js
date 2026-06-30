import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { ReactTyped } from 'react-typed';
import ScrambleText from './ScrambleText';

function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  const scrollToWork = () => {
    document.getElementById('work').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className='hero-container'>
      {!videoReady && <div className='hero-fallback'></div>}

      <video
        src='/videos/video-wave.mp4'
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        onCanPlayThrough={() => setVideoReady(true)}
      />

      <h1>
        {videoReady ? <ScrambleText text="SANA SHAHZAD" /> : "SANA SHAHZAD"}
      </h1>

      {videoReady && (
        <ReactTyped
          className='typed-text'
          strings={[
            'Graphic Designer',
            'Coder and Developer',
            'Pixel Perfectionist',
            'Artist With a Compiler',
            'Powered By Caffeine',
            'Exploring Digital Depths',
            'Surfacing New Ideas Daily',
            'Do You Like The Ocean Puns'
          ]}
          typeSpeed={80}
          backSpeed={50}
          loop
        />
      )}

      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={scrollToWork}
        >
          VIEW MY WORK
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;