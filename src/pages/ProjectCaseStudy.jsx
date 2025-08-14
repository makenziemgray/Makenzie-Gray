// src/pages/ProjectCaseStudy.jsx
import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import "./CaseStudy.css";

// Minimal data; expand as you add content
const DATA = {
  mapsgo: {
    title: "MapsGo",
    eyebrow: "Coding • Case Study",
    summary: "Store locator & mapping utility with performant search and geospatial queries.",
    tech: ["JavaScript","jQuery","SQL"],
    actions: { code: null }, // no repo yet
    sections: {
      "Key Facts": [
        "Built searchable store index with distance ranking",
        "CSV → DB ingestion pipeline",
      ],
      "Tech Stack": ["Vanilla JS, jQuery", "Node/Express API", "Postgres (PostGIS)"],
      "Challenges & Learnings": [
        "Debounced queries; reduced p95 latency by ~35%",
        "Address normalization and geocoding quirks",
      ],
      Outcomes: [
        "Faster ‘store near me’ UX with clear empty states",
        "Reduced ops by better data checks",
      ],
    },
    gallery: [],
  },
  "home-hub": {
    title: "Home Hub",
    eyebrow: "Coding • Case Study",
    summary: "Household organizer/dashboard app for chores, bills, and shared notes.",
    tech: ["React"],
    actions: { code: null },
    sections: {
      "Key Facts": ["Modular cards", "Realtime shared state (design)"],
      "Tech Stack": ["React", "Vite"],
      "Challenges & Learnings": ["Card composition and prop drilling choices"],
      Outcomes: ["Friction‑free weekly planning"],
    },
    gallery: [],
  },
  petpal: {
    title: "PetPal",
    eyebrow: "Coding • Case Study",
    summary: "Pet care manager for visits, grooming, meds, and supplies.",
    tech: ["Next.js","Tailwind CSS"],
    actions: { code: null },
    sections: {
      "Key Facts": ["Owner → pet → task hierarchy", "Push reminders (design)"],
      "Tech Stack": ["Next.js", "Prisma (planned)"],
      "Challenges & Learnings": ["Scheduling UX & conflicts"],
      Outcomes: ["Clear routine tracking"],
    },
    gallery: [],
  },
  portfolio: {
    title: "This Portfolio",
    eyebrow: "Coding • Case Study",
    summary: "The site you’re on—built with React and an earthy/serene design system.",
    tech: ["React"],
    actions: { code: "https://github.com/makenziemgray" },
    sections: {
      "Key Facts": ["Ambient background motion", "Cards with tabs", "Accessible focus states"],
      "Tech Stack": ["React + Vite", "CSS (no framework)"],
      "Challenges & Learnings": ["Balancing motion with clarity", "Theming tokens"],
      Outcomes: ["Stronger personal brand & faster iteration"],
    },
    gallery: [],
  },
  "fern-system": {
    title: "Design System ‘Fern’",
    eyebrow: "Design • Case Study",
    summary: "Token‑first palette, spacing, shadow, and component spec in Figma.",
    tech: ["Figma","Design Tokens"],
    actions: { figma: "https://www.figma.com/" }, // put real share link
    sections: {
      "Key Facts": ["Color & type tokens", "States & accessibility"],
      "Toolkit": ["Figma styles + variables", "Auto‑layout libraries"],
      "Challenges & Learnings": ["Naming & scale discipline"],
      Outcomes: ["Reusable UI at velocity"],
    },
    gallery: [],
  },
  "wellness-ui": {
    title: "Wellness App UI",
    eyebrow: "Design • Case Study",
    summary: "Mobile app UI prototype with flows and micro‑interactions.",
    tech: ["Figma","Prototyping"],
    actions: { figma: "https://www.figma.com/" },
    sections: {
      "Key Facts": ["Onboarding flow", "Progress ring & streaks"],
      "Toolkit": ["Variants, Smart animate"],
      "Challenges & Learnings": ["Information scent & rewards"],
      Outcomes: ["Faster first‑week activation"],
    },
    gallery: [],
  },
};

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const [sp] = useSearchParams();
  const _type = sp.get("type") || "code";
  const project = DATA[slug];

  if (!project) {
    return (
      <section className="cs-wrap">
        <div className="cs-card">
          <div className="cs-header">
            <span className="cs-eyebrow">Case Study</span>
            <h1>Not found</h1>
            <p className="cs-summary">This project doesn’t exist yet.</p>
            <div className="cs-actions">
              <Link className="btn-secondary" to="/projects">← Back to Projects</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasCode = !!project.actions?.code;
  const hasFigma = !!project.actions?.figma;

  return (
    <section className="cs-wrap">
      <article className="cs-card">
        <header className="cs-header">
          <span className="cs-eyebrow">{project.eyebrow}</span>
          <h1>{project.title}</h1>
          <p className="cs-summary">{project.summary}</p>

          {/* Sticky action bar */}
          <div className="cs-actions">
            <Link className="btn-secondary" to="/projects">← Back to Projects</Link>
            {hasCode && (
              <a className="btn-primary" href={project.actions.code} target="_blank" rel="noreferrer">
                View Code
              </a>
            )}
            {hasFigma && (
              <a className="btn-primary" href={project.actions.figma} target="_blank" rel="noreferrer">
                Open Figma
              </a>
            )}
          </div>

          <div className="cs-meta">
            <div className="cs-chips">
              {project.tech?.map(t => <span className="chip" key={t}>{t}</span>)}
            </div>
          </div>
        </header>

        {/* Two-column sections */}
        <section className="cs-sections">
          {Object.entries(project.sections).map(([title, list]) => (
            <div className="cs-col" key={title}>
              <h2>{title}</h2>
              {Array.isArray(list) ? (
                <ul>
                  {list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p>{String(list)}</p>
              )}
            </div>
          ))}
        </section>

        {/* Gallery (optional screenshots) */}
        {project.gallery?.length ? (
          <section className="cs-gallery">
            {project.gallery.map((src, i) => (
              <figure className="cs-shot" key={i}>
                <img src={src} alt={`${project.title} screenshot ${i+1}`} />
              </figure>
            ))}
          </section>
        ) : null}
      </article>
    </section>
  );
}