import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ScrollTrigger,
  useSectionReveal,
} from "./useHomeMotion";

import TextReveal from "./TextReveal";

export default function DeveloperHero() {
  const root = useRef(null);
  const video = useRef(null);

  const [playing, setPlaying] = useState(false);

  useSectionReveal(root);

  /* =========================================
     VIDEO PLAYBACK
  ========================================= */

  useEffect(() => {
    const element = video.current;
    const section = root.current;

    if (!element || !section) return;

    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let visible = true;

    const syncPlayback = () => {
      if (
        preference.matches ||
        !visible ||
        document.hidden
      ) {
        element.pause();
        return;
      }

      element.play().catch(() => {
        setPlaying(false);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      }
    );

    observer.observe(section);

    preference.addEventListener(
      "change",
      syncPlayback
    );

    document.addEventListener(
      "visibilitychange",
      syncPlayback
    );

    syncPlayback();

    return () => {
      observer.disconnect();

      preference.removeEventListener(
        "change",
        syncPlayback
      );

      document.removeEventListener(
        "visibilitychange",
        syncPlayback
      );

      element.pause();
    };
  }, []);

  /* =========================================
     HERO
  ========================================= */

  return (
    <section
      className="home-hero"
      ref={root}
      aria-labelledby="home-name"
      data-reveal-root
    >

      {/* OCEAN BACKGROUND */}

      <div
        className="home-hero-media"
        aria-hidden="true"
      >
        <img
          className="home-hero-poster"
          src="/images/video-poster.png"
          alt=""
          fetchPriority="high"
        />

        <video
          ref={video}
          className={playing ? "is-playing" : ""}
          src="/videos/video-wave.mp4"
          poster="/images/video-poster.png"
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          onLoadedMetadata={() =>
            ScrollTrigger.refresh()
          }
        />
      </div>


      {/* HERO CONTENT */}

      <div className="home-hero-content">

        <div
          className="home-hero-eyebrow home-meta"
          data-reveal
        >
          <span>
            PORTFOLIO / 2026
          </span>

          <span>
            SOFTWARE DEVELOPER &amp; CREATIVE
          </span>
        </div>


        <h1
          id="home-name"
          aria-label="Sana Shahzad"
        >
          <TextReveal
            className="home-hero-name"
            delay={0.15}
            lines={["SANA", "SHAHZAD"]}
          >
            SANA SHAHZAD
          </TextReveal>
        </h1>

        <div className="home-hero-footer home-meta" data-reveal>
          <span>TORONTO, CANADA</span>
          <span>SCROLL TO EXPLORE <span aria-hidden="true">→</span></span>
        </div>

      </div>

    </section>
  );
}
