import React from "react";
import "./About.css";
import profileImage from "../assets/IMG_5416.jpeg";

/* Inline icons from Hero.jsx */
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452H16.9v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.369V9h3.4v1.561h.049c.474-.9 1.637-1.852 3.367-1.852 3.6 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a1.973 1.973 0 110-3.946 1.973 1.973 0 010 3.946zM6.813 20.452H3.861V9h2.952v11.452z"/>
  </svg>
);
const GmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 4H3.5C2.67 4 2 4.67 2 5.5v13c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5zM20 6l-8 5L4 6v-1l8 5 8-5v1zm0 12H4v-9l8 5 8-5v9z"/>
  </svg>
);
const ResumeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>
  </svg>
);

/* Skills array */
/* Skills array */
const skills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Figma",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "GitHub",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "HTML5",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "jQuery",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Express",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Vite",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg" },
  { name: "Sass",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Bootstrap",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
];

const marqueeRow = [...skills, ...skills];

export default function About() {
  const LINKEDIN = "https://www.linkedin.com/in/makenzie-gray-aa4478197/";
  const EMAIL = "makenziemgray0102@gmail.com";
  const RESUME = "/Makenzie_Gray_Resume.pdf"; // Place file in public folder

  return (
    <section className="about-section" id="about">
      <h2 className="about-title">About Me</h2>

      <div className="about-content">
        <img src={profileImage} alt="Makenzie Gray" className="about-photo" />
        <div className="about-text">
          <p>
            Hi! I’m <strong>Makenzie Gray</strong> — a full-stack developer who blends 
            creativity and engineering to craft intuitive, elegant digital experiences. 
            I specialize in building clean, user-friendly interfaces and robust backend 
            systems that work seamlessly together. I love UX, clean systems, and shipping 
            with care, always aiming for solutions that feel as good to use as they look.
          </p>
          <p>
            Outside of work you’ll find me at concerts, playing tennis, walking my pup, or 
            building LEGO sets. I’m passionate about continuous learning, whether it’s 
            exploring new frameworks, refining design skills, or experimenting with creative 
            side projects. For me, every build is an opportunity to combine technical precision with thoughtful design.
          </p>
        </div>
      </div>

      <h3 className="skills-title">Skills &amp; Tools</h3>

      <div className="skills-ticker" aria-label="Skills and tools">
        <div className="ticker-track" role="list">
          {marqueeRow.map((s, i) => (
            <div className="ticker-item" role="listitem" key={`${s.name}-${i}`} title={s.name}>
              <img src={s.logo} alt="" className="ticker-logo" />
              <span className="ticker-label">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Section */}
      <div className="connect-section">
        <h3 className="connect-title">Let’s Connect</h3>
        <div className="contact-actions" role="group" aria-label="Contact links">
          <a className="contact-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon /><span>LinkedIn</span>
          </a>
          <a className="contact-btn" href={`mailto:${EMAIL}`}>
            <GmailIcon /><span>Email</span>
          </a>
          <a className="contact-btn" href={RESUME} target="_blank" rel="noopener noreferrer">
            <ResumeIcon /><span>Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}