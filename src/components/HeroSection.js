import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { ReactTyped } from 'react-typed';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-wave.mp4' autoPlay loop muted />

      <h1>SANA SHAHZAD</h1>
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

      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;