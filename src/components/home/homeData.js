export const profile = {
  email: 'sanashahzad0169@gmail.com',
  github: 'https://github.com/sunqn05',
  linkedin: 'https://www.linkedin.com/in/sanashahzad',
  resume: '/Sana-Shahzad-Resume.pdf',
};

export const skills = [
  { title: 'Languages', items: ['Python', 'Java', 'C', 'C#', 'JavaScript', 'TypeScript'] },
  { title: 'Systems & Networking', items: ['Linux', 'TCP/IP', 'Socket Programming', 'Processes & Threads', 'Memory Management', 'Client-Server Architecture'] },
  { title: 'Developer Tools & IDEs', items: ['Git', 'GitHub', 'VS Code', 'Visual Studio', 'IntelliJ IDEA', 'PyCharm'] },
  { title: 'Design Software', items: ['Figma', 'Adobe Photoshop', 'Illustrator', 'InDesign', 'Autodesk Maya', 'Unity'] },
  { title: 'Design & Interactive', items: ['UI/UX Design', 'Graphic Design', 'Game Design', '3D Modeling', 'Pixel Art', 'Responsive Web Design'] },
  { title: 'Web & Frameworks', items: ['React', 'Vite', 'HTML/CSS', 'Tailwind CSS'],}
];

// Add projects here when ready. Each entry uses this shape:
// { id: 'unique-id', title: '', description: '', image: '/images/...',
//   imageAlt: '', technologies: ['React'], github: 'https://...', demo: 'https://...' }
// image, github, and demo are optional.
export const projects = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    category: "WEB DEVELOPMENT",
    description:
      "My personal developer portfolio, built as an interactive space for my projects, skills, experience, and creative work.",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "GSAP",
    ],
    image: "/images/projects/website2.png",
    imageAlt: "Sana Shahzad developer portfolio homepage",
    href: "https://sanashahzad.netlify.app/",
    linkLabel: "View Website",
  },

  {
    id: "her-closet",
    title: "Her Closet",
    category: "SOFTWARE DEVELOPMENT",
    description:
      "An AI-powered shopping engine and personalized discovery platform for modest fashion across fragmented retail stores.",
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Figma",
    ],
    image: "/images/projects/hercloset.png",
    imageAlt: "Her Closet modest fashion discovery platform",
    href: "https://github.com/heba-rah/hercloset",
    linkLabel: "View on GitHub",
  },

  {
    id: "all-projects",
    title: "All Projects",
    category: "GITHUB",
    description:
      "Explore more of my development work, experiments, and projects on GitHub.",
    technologies: [],
    image: "/images/projects/heart.jpg",
    imageAlt: "Collection of software development projects",
    href: "https://github.com/sunqn05",
    linkLabel: "Explore GitHub",
  },
];

// Experience from the supplied Sana Shahzad résumé.
export const experience = [
  {
    organization: 'ULTIMATE CODERS ♡', role: 'Coding Instructor', dates: 'Aug 2025 - Present',
    category: 'TECHNICAL EDUCATION',
    description: 'Making complex coding concepts approachable through hands-on, debugging, project-based learning, including game, web, and software development.',
    details: ['Teach Scratch, Python, HTML, CSS, JavaScript, and Arduino.', 'Adapt lessons to different learning styles in small-group settings.'],
  },
  {
    organization: 'MCSS ♡', role: 'VP Marketing', dates: 'Aug 2026 - Present',
    category: 'LEADERSHIP & COMMUNICATION',
    description: 'Co-leading marketing strategy and creative direction for the Mathematical & Computational Sciences Society at UTM.',
    details: ['Coordinate social media and graphic design initiatives.', 'Bring photography and videography into the society’s communications.'],
  },
];
