import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import LoadingScreen from "./LoadingScreen";
import CircularText from "./CircularText";
import { ReactTyped } from "react-typed";

function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef(null); 

  const scrollToWork = () => {
    document.getElementById('archive')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
  const video =
    videoRef.current;

  if (!video) return;

  const tryPlay = async () => {
    try {
      await video.play();
    } catch (error) {
      console.log(
        "Video autoplay waiting:",
        error
      );
    }
  };

  tryPlay();
}, []);

  return (
    <>
      <LoadingScreen fadeOut={videoReady} />

      <div className="hero-container">

        {/* EDITORIAL DECORATIONS */}

        {/* LEFT EDITORIAL DECORATION */}

        <div className="hero-editorial hero-editorial-left">
          <span className="editorial-line" />
          <span className="editorial-star">✦</span>
          <span className="editorial-line" />
        </div>


        {/* RIGHT EDITORIAL DECORATION */}

        <div className="hero-editorial hero-editorial-right">
          <span className="editorial-line" />
          <span className="editorial-star">✦</span>
          <span className="editorial-line" />
        </div>

        <div className="hero-editorial-bottom">
          <span>CODE</span>
          <span className="editorial-dot">•</span>
          <span>DESIGN</span>
          <span className="editorial-dot">•</span>
          <span>PHOTOGRAPHY</span>
        </div>

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
          ref={videoRef}

          src="/videos/video-wave.mp4"

          poster="/images/video-poster.png"

          autoPlay
          muted
          loop
          playsInline

          preload="auto"

          onCanPlay={() => {
            videoRef.current
              ?.play()
              .catch(() => {});
          }}

          onPlaying={() => {
            setVideoReady(true);
          }}
        />

        <div className="hero-overlay"></div>

        <h1 className="hero-name">
          <span className="hero-name-first">SANA</span>
          <span className="hero-name-last">SHAHZAD</span>
        </h1>

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