import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Exploration.css";

/* ---------------- DATA ---------------- */
const CODING = [
  { slug: "mapsgo", title: "MapsGo", blurb: "Store locator & mapping utility.", tech: ["JavaScript", "jQuery", "SQL"], soon: true, caseStudy: true },
  { slug: "home-hub", title: "Home Hub", blurb: "Household organizer dashboard.", tech: ["React"], soon: true, caseStudy: true },
  { slug: "petpal", title: "PetPal", blurb: "Pet care management.", tech: ["Next.js", "Tailwind"], soon: true, caseStudy: true },
  { slug: "portfolio", title: "This Portfolio", blurb: "Earthy/serene React build.", tech: ["React"], soon: false, caseStudy: true },
];

const DESIGN = [
  { slug: "fern-system", title: "Design System ‘Fern’", blurb: "Token‑based system.", tech: ["Figma", "Design Tokens"], soon: true, caseStudy: true },
  { slug: "wellness-ui", title: "Wellness App UI", blurb: "Hi‑fi prototype.", tech: ["Figma", "Prototyping"], soon: true, caseStudy: true },
];

/* --------------- PRESENTATIONALS --------------- */
const TechChips = ({ tech = [] }) =>
  tech.length ? (
    <div className="tech-chips">
      {tech.map((t) => (
        <span key={t} className="chip">{t}</span>
      ))}
    </div>
  ) : null;

function ProjectCard({ item }) {
  const clickable = item.caseStudy && !item.soon;
  const Wrapper = clickable ? Link : "div";
  const wrapperProps = clickable
    ? { to: `/projects/${item.slug}`, className: "card-link", "aria-label": `${item.title} — open case study` }
    : { className: "card-link disabled", "aria-disabled": true };

  return (
    <article id={item.slug} className={`project-card ${item.soon ? "is-soon" : ""}`}>
      <div className="thumb placeholder" aria-hidden="true">
        {item.soon && <span className="soon-badge">Coming&nbsp;soon</span>}
      </div>
      <div className="meta">
        <h3>{item.title}</h3>
        <p>{item.blurb}</p>
        <TechChips tech={item.tech} />
        {item.caseStudy && (
          <div className="actions-row">
            <span className={`case-link ${item.soon ? "muted" : ""}`}>
              {item.soon ? "Case Study (soon)" : "Read Case Study ↗"}
            </span>
          </div>
        )}
      </div>
      <Wrapper {...wrapperProps} />
    </article>
  );
}

/* --------------- SIDEBAR --------------- */
function Sidebar({ coding, design, activeId }) {
  return (
    <aside className="exp-sidebar">
      <div className="side-title">Explore</div>

      <div className="side-group">
        <div className="side-heading">Coding Projects</div>
        <ul>
          {coding.map((p) => (
            <li key={p.slug}>
              <a className={activeId === p.slug ? "active" : ""} href={`#${p.slug}`}>{p.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-group">
        <div className="side-heading">Design Projects</div>
        <ul>
          {design.map((p) => (
            <li key={p.slug}>
              <a className={activeId === p.slug ? "active" : ""} href={`#${p.slug}`}>{p.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

/* --------------- PAGE --------------- */
export default function Exploration() {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState("");
  const containerRef = useRef(null);

  const sections = useMemo(
    () => [
      { id: "coding", title: "Coding Projects", data: CODING },
      { id: "design", title: "Design Projects", data: DESIGN },
    ],
    []
  );

  // Deep link to #id on entry / route change
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  // Highlight active item in sidebar as you scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card[id]");
    if (!cards.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const topMost =
          entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMost?.target?.id) setActiveId(topMost.target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 0.2, 0.6] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="exp-wrap">
      <div className="exp-layout" ref={containerRef}>
        <Sidebar coding={CODING} design={DESIGN} activeId={activeId} />
        <main className="exp-main">
          <header className="exp-header">
            <h1>Exploration</h1>
            <p>
              Selected engineering &amp; design explorations. Use the sidebar or click a project card on the homepage to
              deep‑link into this section.
            </p>
          </header>

          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="exp-section">
              <h2 className="section-title">
                <span className="dot" /> {sec.title}
              </h2>
              <div className="project-grid">
                {sec.data.map((item) => (
                  <ProjectCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}