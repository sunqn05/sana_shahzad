import React, { useEffect } from 'react';
import DeveloperHero from '../home/DeveloperHero';
import HomeAbout from '../home/HomeAbout';
import SectionTransition from '../home/SectionTransition';
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
      <div className="home-chapter"><DeveloperHero /><HomeAbout /></div>
      <div className="home-chapter">
        <SectionTransition title="SKILLS" number="02" label="THE TOOLKIT" note="TECHNOLOGY / SYSTEMS / DESIGN" variant="skills" />
        <SkillsSection />
      </div>
      <div className="home-chapter">
        <SectionTransition title="PROJECTS" number="03" label="SELECTED WORK" note="IDEAS INTO EXPERIENCES" variant="projects" />
        <ProjectsSection />
      </div>
      <div className="home-chapter">
        <SectionTransition title="EXPERIENCE" number="04" label="ALONG THE WAY" note="LEARNING / TEACHING / LEADING" variant="experience" />
        <ExperienceSection />
      </div>
      <div className="home-chapter">
        <SectionTransition title="ARCHIVE" number="05" label="OUTSIDE OF CODE" note="A DIFFERENT KIND OF EXPLORATION" variant="archive" />
        <div className="home-archive-sheet" id="archive" tabIndex={-1}><Archive /></div>
      </div>
      <HomeContact />
    </main>
  );
}
