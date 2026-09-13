import React, { useEffect, useRef } from 'react';
import { skills } from './homeData';
import { useSectionReveal } from './useHomeMotion';
import TextReveal from './TextReveal';

const skillColumns = [
  {
    side: 'left',
    titles: ['Languages', 'Systems & Networking', 'Developer Tools & IDEs'],
  },
  {
    side: 'right',
    titles: ['Web & Frameworks', 'Design Software', 'Design & Interactive'],
  },
];

const skillIcons = {
  Python: 'devicon-python-plain',
  Java: 'devicon-java-plain',
  C: 'devicon-c-plain',
  'C#': 'devicon-csharp-plain',
  JavaScript: 'devicon-javascript-plain',
  TypeScript: 'devicon-typescript-plain',
  Linux: 'devicon-linux-plain',
  'TCP/IP': 'fas fa-network-wired',
  'Socket Programming': 'fas fa-plug',
  'Processes & Threads': 'fas fa-microchip',
  'Memory Management': 'fas fa-memory',
  'Client-Server Architecture': 'fas fa-server',
  Git: 'devicon-git-plain',
  GitHub: 'devicon-github-original',
  'VS Code': 'devicon-vscode-plain',
  'Visual Studio': 'devicon-visualstudio-plain',
  'IntelliJ IDEA': 'devicon-intellij-plain',
  PyCharm: 'devicon-pycharm-plain',
  React: 'devicon-react-original',
  Vite: 'devicon-vitejs-plain',
  'HTML/CSS': 'devicon-html5-plain',
  'Tailwind CSS': 'devicon-tailwindcss-original',
  Figma: 'devicon-figma-plain',
  'Adobe Photoshop': 'devicon-photoshop-plain',
  Illustrator: 'devicon-illustrator-plain',
  InDesign: 'fas fa-book-open',
  'Autodesk Maya': 'devicon-maya-plain',
  Unity: 'devicon-unity-plain',
  'UI/UX Design': 'fas fa-object-group',
  'Graphic Design': 'fas fa-pen-nib',
  'Game Design': 'fas fa-gamepad',
  '3D Modeling': 'fas fa-cube',
  'Pixel Art': 'fas fa-th',
  'Responsive Web Design': 'fas fa-laptop-code',
};

function SkillCard({ skill, index }) {
  return (
    <article className="home-skill-card">
      <div className="home-card-top">
        <div className="home-skill-card-heading">
          <span className="home-meta">{String(index + 1).padStart(2, '0')}</span>
          <h3>{skill.title}</h3>
        </div>
        <span className="home-meta" aria-hidden="true">♡</span>
      </div>
      <ul>
        {skill.items.map(item => (
          <li className="home-skill-item" key={item}>
            <i className={`home-skill-icon ${skillIcons[item] || 'fas fa-code'}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SkillsOcean() {
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return undefined;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    const syncPlayback = () => {
      if (preference.matches || !visible || document.hidden) {
        element.pause();
        return;
      }

      element.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '120px 0px' });

    observer.observe(element);
    preference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      preference.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, []);

  return (
    <div className="home-skills-ocean" data-image-reveal aria-hidden="true">
      <img src="/images/video-poster.png" alt="" loading="lazy" />
      <video
        ref={video}
        src="/videos/video-wave.mp4"
        poster="/images/video-poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
  );
}

export default function SkillsSection() {
  const root = useRef(null);
  const skillsByTitle = new Map(skills.map(skill => [skill.title, skill]));
  useSectionReveal(root);

  return (
    <section className="home-sheet home-section home-skills" id="skills" ref={root} tabIndex={-1} aria-labelledby="skills-title">
      <div className="home-content-label home-meta" data-reveal>
        <span>02 / SKILLS ♡</span><span>TOOLS &amp; TECHNOLOGIES</span>
      </div>
      <h2 className="home-section-title home-section-title--right" id="skills-title">
        <TextReveal>Skills</TextReveal>
      </h2>
      <div className="home-skills-composition">
        <div className="home-skills-column home-skills-column--left">
          {skillColumns[0].titles.map((title, index) => {
            const skill = skillsByTitle.get(title);
            return <div data-card key={title}><SkillCard skill={skill} index={index} /></div>;
          })}
        </div>

        <SkillsOcean />

        <div className="home-skills-column home-skills-column--right">
          {skillColumns[1].titles.map((title, index) => {
            const skill = skillsByTitle.get(title);
            return <div data-card key={title}><SkillCard skill={skill} index={index + 3} /></div>;
          })}
        </div>
      </div>
    </section>
  );
}
