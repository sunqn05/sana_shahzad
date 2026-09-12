import React, { useEffect, useRef } from 'react';
import DeveloperHero from '../home/DeveloperHero';
import HomeAbout from '../home/HomeAbout';
import SkillsSection from '../home/SkillsSection';
import ProjectsSection from '../home/ProjectsSection';
import ExperienceSection from '../home/ExperienceSection';
import HomeContact from '../home/HomeContact';
import Archive from '../Archive';
import { useHorizontalScroll } from '../home/useHomeMotion';
import '../home/Home.css';

export default function Home() {
  const horizontal = useRef(null);
  const track = useRef(null);
  useHorizontalScroll(horizontal, track);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Sana Shahzad — Software Developer';
    document.documentElement.classList.add('developer-home-active');
    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove('developer-home-active');
    };
  }, []);

  return (
    <main className="developer-home" id="home-main" tabIndex={-1}>
      <div className="home-horizontal-scroll" ref={horizontal}>
        <div className="home-horizontal-track" ref={track}>
          <DeveloperHero />
          <HomeAbout />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <div className="home-archive-sheet" id="archive" tabIndex={-1}><Archive /></div>
          <HomeContact />
        </div>
      </div>
    </main>
  );
}
