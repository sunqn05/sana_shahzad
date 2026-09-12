import React, { useEffect } from 'react';
import DeveloperHero from '../home/DeveloperHero';
import HomeAbout from '../home/HomeAbout';
import SkillsSection from '../home/SkillsSection';
import ProjectsSection from '../home/ProjectsSection';
import ExperienceSection from '../home/ExperienceSection';
import HomeContact from '../home/HomeContact';
import Archive from '../Archive';
import '../home/Home.css';

export default function Home() {
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
      <DeveloperHero />
      <HomeAbout />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <Archive />
      <HomeContact />
    </main>
  );
}
