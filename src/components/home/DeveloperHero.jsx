import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  gsap,
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
     HERO SCROLL MOTION
  ========================================= */

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current.parentElement,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
          .to(
            ".home-hero-media",
            {
              scale: 1.06,
              ease: "none",
            },
            0
          )
          .to(
            ".home-hero-content",
            {
              y: -60,
              opacity: 0.5,
              ease: "none",
            },
            0
          );
      },
      root
    );

    return () => media.revert();
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
            SOFTWARE DEVELOPER
          </span>

          <span>
            BASED IN TORONTO, ON
          </span>
        </div>


        <h1
          id="home-name"
          aria-label="Sana"
        >
          <TextReveal
            className="home-hero-name"
            delay={0.15}
          >
            SANA
          </TextReveal>
        </h1>

      </div>

    </section>
  );
}