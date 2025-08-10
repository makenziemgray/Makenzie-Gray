// src/components/About.jsx
import React from "react";
import "./About.css";
import "./Skills.css"; // reuse your existing skills styles
import profileImage from "../assets/IMG_5416.jpeg";

// Put skills outside the component
const skills = [
  {
    name: "JavaScript",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    level: 90,
  },
  {
    name: "TypeScript",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    level: 85,
  },
  {
    name: "React",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    level: 80,
  },
  {
    name: "Node.js",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    level: 75,
  },
  {
    name: "Figma",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    level: 70,
  },
  {
    name: "GitHub",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    level: 85,
  },
  {
    name: "HTML5",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    level: 95,
  },
  {
    name: "CSS3",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    level: 90,
  },
];

function About() {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy text."));
  };

  return (
    <section className="about-section" id="about">
      <h2>About Me</h2>

      <div className="about-content">
        <img src={profileImage} alt="Makenzie Gray" className="about-photo" />
        <div className="about-text">
          <p>
            Hi! I’m Makenzie Gray — a full-stack developer who blends creativity and
            engineering to craft intuitive, elegant digital experiences. I love UX,
            clean systems, and shipping with care.
          </p>
          <p>
            Outside of work you’ll find me at concerts, playing tennis, walking my pup,
            or building LEGO sets.
          </p>
        </div>
      </div>

      {/* Skills on the About page */}
      <div className="skills skills-on-about" id="skills" style={{ marginTop: "2.5rem" }}>
        <h2>Skills &amp; Tools</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.name}>
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                className="skill-logo"
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copy to clipboard actions */}
      <div className="contact-links" style={{ marginTop: "2rem" }}>
        <button
          onClick={() =>
            copyToClipboard("https://www.linkedin.com/in/makenzie-gray-aa4478197/")
          }
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "1rem",
            marginRight: "1rem",
          }}
        >
          🔗 Copy LinkedIn
        </button>

        <button
          onClick={() => copyToClipboard("makenziemgray0102@gmail.com")}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ✉️ Copy Email
        </button>
      </div>
    </section>
  );
}

export default About;