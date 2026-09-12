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
  const roleRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const roles = ["SOFTWARE DEVELOPER", "GRAPHIC DESIGNER", "ENGINEER"];
  const [roleIndex, setRoleIndex] = useState(0);

  useSectionReveal(root);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return undefined;

    const entranceDelay = 1.9;
    let interval;
    const timeout = window.setTimeout(() => {
      if (roleRef.current) ScrollTrigger.refresh();
      interval = window.setInterval(() => {
        setRoleIndex(current => (current + 1) % roles.length);
      }, 4200);
    }, entranceDelay * 1000);

    return () => {
      if (interval) window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [roles.length]);

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


        <div className="home-hero-composition">
          <h1 id="home-name" className="home-hero-name-row home-hero-name-row--top" aria-label="Sana Shahzad">
            <TextReveal className="home-hero-name" delay={0.15} lines={["SANA"]} />
          </h1>

          <div className="home-hero-banner">
            <div className="home-hero-media" aria-hidden="true">
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
                onLoadedMetadata={() => ScrollTrigger.refresh()}
              />
            </div>

            <span className="home-hero-role" aria-live="polite">
              <span className="home-hero-role-mask">
                <span ref={roleRef} key={roles[roleIndex]} className="home-hero-role-word" data-reveal>
                  {roles[roleIndex]}
                </span>
              </span>
            </span>
          </div>

          <div className="home-hero-name-row home-hero-name-row--bottom" aria-hidden="true">
            <TextReveal className="home-hero-name" delay={0.28} lines={["SHAHZAD"]} />
          </div>
        </div>

        <div className="home-hero-footer home-meta" data-reveal>
          <span>TORONTO, CANADA</span>
          <span>SCROLL TO EXPLORE <span aria-hidden="true">→</span></span>
        </div>

      </div>

    </section>
  );
}
