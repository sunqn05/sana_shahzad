import React, { useEffect } from 'react';
import DeveloperHero from '../home/DeveloperHero';
import HomeAbout from '../home/HomeAbout';
import SkillsSection from '../home/SkillsSection';
import ProjectsSection from '../home/ProjectsSection';
import ExperienceSection from '../home/ExperienceSection';
import HomeContact from '../home/HomeContact';
import Archive from '../Archive';
import ChapterHeader from '../home/ChapterHeader';
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
      <ChapterHeader id="about" label="01 / ABOUT" meta="A LITTLE CONTEXT" title="About me" align="bottom-right" />
      <HomeAbout />
      <ChapterHeader id="skills" label="02 / SKILLS" meta="TOOLS & TECHNOLOGIES" title="Skills" align="upper-left" tone="dark" />
      <SkillsSection />
      <ChapterHeader id="projects" label="03 / PROJECTS" meta="SELECTED WORK" title="Projects" align="bottom-right" />
      <ProjectsSection />
      <ChapterHeader id="experience" label="04 / EXPERIENCE" meta="PEOPLE, IDEAS & IMPACT" title="Experience" align="upper-left" tone="dark" />
      <ExperienceSection />
      <ChapterHeader id="archive" label="05 / ARCHIVE" meta="OUTSIDE OF CODE" title="Archive" align="bottom-right" />
      <div className="home-archive-sheet home-chapter-content" id="archive-content"><Archive /></div>
      <HomeContact />
    </main>
  );
}
