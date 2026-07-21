import React, { useState, useRef } from "react";
import "./AboutMe.css";

const tracks = [
{
id: "01",
title: "Introduction",
time: "22:08:05",
image: "/images/about/about-11.jpg",
text: "Hi, I'm Sana. I'm a Computer Science student and creative developer who loves turning ideas into meaningful digital experiences.",
tags: ["CS Student", "City", "Artist"],
},
{
id: "02",
title: "University of Toronto",
time: "23:28",
image: "/images/about/about-8.jpg",
text: "I'm currently a Computer Science major at UofT, alongside a double minor in Mathematical Sciences and Game Studies.",
tags: ["Computer Science", "Mathematical Sciences", "Game Studies"],
},
{
id: "03",
title: "Outside Of Developing",
time: "17:38",
image: "/images/about/about-5.jpg",
text: "When I'm not coding or designing, I'm probably gaming, eating food, and hanging out with my friends!",
tags: ["Music", "Coffee", "Ocean", "Photos"],
},
{
id: "04",
title: "Current Goals",
time: "00:00",
image: "/images/about/about-6.jpg",
text: "Right now, I'm focused on keeping up with the latest AI tools, building this portfolio, and now a youtube channel!",
tags: ["Portfolio", "AI", "UI Design"],
},
{
id: "05",
title: "My Soundtrack",
time: "4:35",
image: "/images/about/about-7.jpg",
text: "Check out the different tracks I listen to, and the UI this About Me page was inpired by!",
tags: ["Spotify", "Creating", "Inspiration"],
spotify: true,
},
{
id: "06",
title: "My Pinterest",
time: "Moodboard",
image: "/images/about/about-10.jpg",
text: "Check out one of my favourite platforms that inspire me.",
tags: ["Pinterest", "Moodboards", "Inspiration"],
pinterest: true,
},
{
id: "07",
title: "My YouTube",
time: "Now Playing",
image: "/images/about/about-12.jpg",
text: "My newest creative outlet! I recently started creating YouTube videos to share my hobbies.",
tags: ["YouTube", "Video Editing", "Gaming"],
youtube: true,
},
{
id: "08",
title: "Photography",
time: "24:7",
image: "/images/about/about-2.jpg",
text: "Photography taught me how to notice lighting and emotion. I love capturing moments that feel cinematic and candid.",
tags: ["Portraits", "Cars", "Nature", "Details"],
},
{
id: "09",
title: "Programming",
time: "3:14",
image: "/images/about/about-3.jpg",
text: "I enjoy building interactive websites that are functional as well as memorable and personal.",
tags: ["React", "JavaScript", "HTML", "CSS"],
},
{
id: "10",
title: "Graphic Design",
time: "43:110",
image: "/images/about/about-4.jpg",
text: "Design helps me communicate visually. I love mood, colour, and the small details that make something feel polished.",
tags: ["Photoshop", "Illustrator", "Figma"],
},
];


function AboutMe() {
  const [current, setCurrent] = useState(tracks[0]);
  const nowPlayingRef = useRef(null);

  const selectTrack = (track) => {
    setCurrent(track);

    if (window.innerWidth <= 1250) {
      setTimeout(() => {
        nowPlayingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  };

  return (
    <section className="spotify-about">
      <div className="about-wave-background">
        <video
          className="about-wave-video"
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

        <div className="about-wave-overlay" />
      </div>
      <aside className="spotify-sidebar">
        <div className="profile-circle">
          <img
            src="/images/about/about-1.jpg"
            alt="Sana Shahzad"
          />
        </div>

        <nav>
          <a href="/">Home</a>
          <a
            className="active"
            href="/about"
          >
            About Me
          </a>
          <a href="/gallery">Gallery</a>
          <a href="/projects">Projects</a>
        </nav>

        <div className="playlist">
          <h4>My Playlist</h4>

          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => selectTrack(track)}
              className={
                current.id === track.id
                  ? "track active-track"
                  : "track"
              }
            >
              <img
                src={track.image}
                alt={track.title}
              />

              <span>
                {track.title}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <main className="spotify-main">
        <div className="heading">
          <h1>
            Creative Collection
          </h1>
        </div>

        <div className="album-grid">
          {tracks.map((track) => (
            <button
              key={track.id}
              className={
                current.id === track.id
                  ? "album-card selected"
                  : "album-card"
              }
              onClick={() => selectTrack(track)}
            >
              <div className="album-image">
                <img
                  src={track.image}
                  alt={track.title}
                />

                <span>
                  {track.id}
                </span>

                <div className="play-btn">
                  ▶
                </div>
              </div>

              <h3>
                {track.title}
              </h3>

              <p>
                {track.time}
              </p>
            </button>
          ))}
        </div>
      </main>

      <aside
        ref={nowPlayingRef}
        className="now-playing"
      >
        <p>
          NOW PLAYING
        </p>

        <h2>
          {current.id}. {current.title}
        </h2>

        <img
          className="now-image"
          src={current.image}
          alt={current.title}
        />

        <div className="waveform">
          {[...Array(28)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="now-text">
          <p>
            {current.text}
          </p>
        </div>

        <div className="tags">
          {current.tags.map((tag) => (
            <span key={tag}>
              {tag}
            </span>
          ))}
        </div>

        {current.spotify && (
          <a
            className="spotify-link"
            href="https://open.spotify.com/user/yndm2c0cvt6e8ey7juu5xdjoe?si=3926645f090c47ff"
            target="_blank"
            rel="noreferrer"
          >
            Open Spotify →
          </a>
        )}

        {current.pinterest && (
          <a
            className="spotify-link"
            href="https://pin.it/2oUgbXo0w"
            target="_blank"
            rel="noreferrer"
          >
            Open Pinterest →
          </a>
        )}

        {current.youtube && (
          <a
            className="spotify-link"
            href="https://www.youtube.com/@ssunqn"
            target="_blank"
            rel="noreferrer"
          >
            Open YouTube →
          </a>
        )}
      </aside>

      <div className="music-player">
        <div className="song-info">
          <img
            src={current.image}
            alt={current.title}
          />

          <div>
            <h4>
              {current.title}
            </h4>

            <p>
              Sana Shahzad
            </p>
          </div>
        </div>

        <div className="controls">
          <span>⟲</span>
          <span>⏮</span>
          <button>⏸</button>
          <span>⏭</span>
          <span>⟳</span>
        </div>

        <div className="progress">
          <span>
            1:41
          </span>

          <div>
            <b></b>
          </div>

          <span>
            {current.time}
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;