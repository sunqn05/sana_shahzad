import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import "./OceanIntro.css";


function ScrambleWord({
  word,
  autoTrigger,
  delay = 0,
}) {
  const [text, setText] = useState(word);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasAutoPlayedRef = useRef(false);

  const characters =
    "ابتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمںنوہھءیے";


  const runScramble = useCallback(() => {
    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(
        word
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return word[index];
            }

            if (letter === " ") {
              return " ";
            }

            return characters[
              Math.floor(
                Math.random() *
                  characters.length
              )
            ];
          })
          .join("")
      );

      iteration += 0.5;

      if (iteration >= word.length) {
        clearInterval(
          intervalRef.current
        );

        setText(word);
      }
    }, 25);
  }, [word]);


  const handleHover = () => {
    const canHover =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

    if (!canHover) return;

    runScramble();
  };


  useEffect(() => {
    if (
      !autoTrigger ||
      hasAutoPlayedRef.current
    ) {
      return;
    }

    hasAutoPlayedRef.current =
      true;

    timeoutRef.current =
      setTimeout(() => {
        runScramble();
      }, delay);

    return () => {
      clearTimeout(
        timeoutRef.current
      );
    };
  }, [
    autoTrigger,
    delay,
    runScramble,
  ]);


  useEffect(() => {
    return () => {
      clearInterval(
        intervalRef.current
      );

      clearTimeout(
        timeoutRef.current
      );
    };
  }, []);


  return (
    <span
      className="scramble-word"
      onMouseEnter={
        handleHover
      }
    >
      {text}
    </span>
  );
}


function OceanIntro() {
  const sectionRef =
    useRef(null);

  const [introVisible, setIntroVisible] =
    useState(false);


  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;


    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setIntroVisible(true);

            observer.disconnect();
          }
        },
        {
          threshold: 0.35,
        }
      );


    observer.observe(section);


    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <section
      className="ocean-intro"
      ref={sectionRef}
    >

      {/* BACKGROUND */}

      <div className="ocean-intro-background">

        <video
          className="ocean-intro-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/video-wave.mp4"
            type="video/mp4"
          />
        </video>

        <div className="ocean-intro-overlay" />

      </div>


      {/* DECORATIVE PARTICLES */}

      <div className="ocean-particles">

        <span className="particle particle-1" />

        <span className="particle particle-2" />

        <span className="particle particle-3" />

        <span className="particle particle-4" />

        <span className="particle particle-5" />

        <span className="particle particle-6" />

      </div>


      <div className="ocean-intro-inner">


        {/* TEXT */}

        <div className="ocean-intro-copy">

          <div className="intro-eyebrow">

            <span className="intro-line" />

            <span>
              01 — INTRODUCTION
            </span>

          </div>


          <h2 className="ocean-intro-heading">

            I create where

            <br />

            <em>

              <ScrambleWord
                word="code"
                autoTrigger={
                  introVisible
                }
                delay={0}
              />

              {" meets "}

              <ScrambleWord
                word="creativity"
                autoTrigger={
                  introVisible
                }
                delay={200}
              />

            </em>

          </h2>


          <p className="ocean-intro-description">

            I'm Sana, a Computer
            Science student and
            creative developer
            exploring the space
            between technology,
            design, photography,
            and interactive
            experiences.

          </p>


          <div className="ocean-intro-fields">

            <span>
              Development
            </span>

            <span>
              Design
            </span>

            <span>
              Photography
            </span>

          </div>


          <Link
            to="/about"
            className="ocean-intro-link"
          >

            <span>
              Learn more about me
            </span>

            <span className="intro-link-arrow">
              ↗
            </span>

          </Link>

        </div>


        {/* WHALE */}

        <div className="jellyfish-scene">

          <div className="jellyfish-glow" />


          <div
            className="
              jellyfish-ring
              jellyfish-ring-one
            "
          />


          <div
            className="
              jellyfish-ring
              jellyfish-ring-two
            "
          />


          <div className="jellyfish-wrapper">

            <img
              src="/images/me/me-15.png"
              alt=""
              className="jellyfish-image"
            />

          </div>


          <div
            className="
              jellyfish-label
              jellyfish-label-one
            "
          >

            <span className="label-number">
              01
            </span>

            DEVELOPMENT

          </div>


          <div
            className="
              jellyfish-label
              jellyfish-label-two
            "
          >

            <span className="label-number">
              02
            </span>

            DESIGN

          </div>


          <div
            className="
              jellyfish-label
              jellyfish-label-three
            "
          >

            <span className="label-number">
              03
            </span>

            PHOTOGRAPHY

          </div>

        </div>

      </div>

    </section>
  );
}

export default OceanIntro;