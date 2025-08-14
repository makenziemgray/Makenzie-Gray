import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import "./CaseStudy.css";

/** Fallback data so deep links work after refresh */
const FALLBACKS = {
  /* ---- CODE ---- */
  "mapsgo": {
    slug: "mapsgo",
    type: "code",
    title: "MapsGo",
    summary: "Store locator & mapping utility built with JavaScript, jQuery, and SQL.",
    tech: ["JavaScript", "jQuery", "SQL"],
    repo: "", // add when ready
    facts: ["Dynamic search", "Radius filtering", "Server-backed results"],
    challenges: ["Fast geo queries", "Clustering markers on zoom"],
    learnings: ["Debounced search", "Tile loading performance"],
    outcome: "Faster store discovery and lower drop‑offs.",
    images: ["/assets/mapsgo/search.png", "/assets/mapsgo/results.png"], // optional if you have
  },
  "home-hub": {
    slug: "home-hub",
    type: "code",
    title: "Home Hub",
    summary: "Household organizer/dashboard app built with React.",
    tech: ["React"],
    repo: "",
    facts: ["Tasks & reminders", "Shared spaces", "Mobile‑first UI"],
    challenges: ["State sync across views", "Offline‑ready lists"],
    learnings: ["Local caching", "Route-based code splitting"],
    outcome: "Clearer household planning and fewer missed tasks.",
    images: ["/assets/homehub/dashboard.png"], // optional
  },
  "portfolio": {
    slug: "portfolio",
    type: "code",
    title: "This Portfolio",
    summary: "Responsive portfolio site built in React with an earthy/serene theme.",
    tech: ["React"],
    repo: "https://github.com/makenziemgray/MG-portfolio",
    facts: ["Semantic HTML", "Smooth scroll", "Case study routes"],
    challenges: ["Theming & motion without clutter"],
    learnings: ["IntersectionObserver reveals", "CSS gradients/noise backgrounds"],
    outcome: "Readable, modern, and fast portfolio.",
    images: ["/assets/portfolio/hero.png"], // optional
  },

  /* ---- DESIGN ---- */
  "fern-system": {
    slug: "fern-system",
    type: "design",
    title: "Design System: ‘Fern’",
    summary: "Token‑based style guide with components and accessibility rules.",
    tech: ["Figma", "Design Tokens"],
    figma: "",
    facts: ["Design tokens", "Component library", "WCAG-friendly color ramps"],
    challenges: ["Scale across surfaces", "Naming for tokens"],
    learnings: ["Figma variables", "Design docs for dev parity"],
    outcome: "Shared language and parts, faster delivery.",
    images: ["/assets/fern/cover.png", "/assets/fern/tokens.png", "/assets/fern/components.png"],
  },
  "wellness-ui": {
    slug: "wellness-ui",
    type: "design",
    title: "Mobile App UI – Wellness",
    summary: "High‑fidelity prototype and interaction flows in Figma.",
    tech: ["Figma", "Prototyping"],
    figma: "",
    facts: ["Onboarding flow", "Micro‑interactions", "Design tokens"],
    challenges: ["Motion that stays calm", "Accessible contrast on pastels"],
    learnings: ["Auto‑layout power", "Prototyping for edge cases"],
    outcome: "Calmer visuals + higher completion rate in user tests.",
    images: ["/assets/wellness/home.png", "/assets/wellness/tracker.png"],
  },
};

export default function CaseStudy() {
  const { state } = useLocation();
  const { slug } = useParams();

  const incoming = state && state.slug ? state : null;
  const project = incoming || FALLBACKS[slug];

  if (!project) {
    return (
      <main className="cs-wrap">
        <div className="cs-card">
          <h1>Project not found</h1>
          <p>That case study or overview isn’t available right now.</p>
          <Link to="/#projects" className="btn-secondary">← Back to Projects</Link>
        </div>
      </main>
    );
  }

  const isDesign = project.type === "design";
  const isCode = project.type === "code";

  return (
    <main className="cs-wrap">
      <article className="cs-card">
        <header className="cs-header">
          <div className="cs-eyebrow">{isDesign ? "Design Case Study" : "Project Overview"}</div>
          <h1>{project.title}</h1>
          <p className="cs-summary">{project.summary}</p>

          <div className="cs-meta">
            {project.tech?.length ? (
              <div className="cs-chips">
                {project.tech.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="cs-actions">
            <Link to="/#projects" className="btn-secondary">← Back to Projects</Link>
            {isDesign && project.figma ? (
              <a className="btn-primary" target="_blank" rel="noopener noreferrer" href={project.figma}>
                View Figma Designs ↗
              </a>
            ) : null}
            {isCode && project.repo ? (
              <a className="btn-primary" target="_blank" rel="noopener noreferrer" href={project.repo}>
                View Code on GitHub ↗
              </a>
            ) : null}
          </div>
        </header>

        <section className="cs-sections">
          <div className="cs-col">
            <h2>Key Facts</h2>
            <ul>{(project.facts || []).map((f, i) => <li key={i}>{f}</li>)}</ul>

            <h2>Outcome</h2>
            <p>{project.outcome || "Details coming soon."}</p>
          </div>

          <div className="cs-col">
            <h2>Challenges</h2>
            <ul>{(project.challenges || []).map((c, i) => <li key={i}>{c}</li>)}</ul>

            <h2>Learnings</h2>
            <ul>{(project.learnings || []).map((l, i) => <li key={i}>{l}</li>)}</ul>
          </div>
        </section>

        {project.images?.length ? (
          <section className="cs-gallery">
            {project.images.map((src, i) => (
              <figure key={i} className="cs-shot">
                <img src={src} alt={`${project.title} ${isDesign ? "design" : "screenshot"} ${i + 1}`} />
              </figure>
            ))}
          </section>
        ) : null}
      </article>
    </main>
  );
}