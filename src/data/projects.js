// src/pages/Projects.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

const CODING = [
  { slug: "mapsgo", title: "MapsGo", desc: "Store locator & mapping utility.", tech: ["JavaScript","jQuery","SQL"], soon: true },
  { slug: "home-hub", title: "Home Hub", desc: "Household organizer dashboard.", tech: ["React"], soon: true },
  { slug: "petpal", title: "PetPal", desc: "Pet care management.", tech: ["Next.js","Tailwind"], soon: true },
  { slug: "portfolio", title: "This Portfolio", desc: "Earthy/serene React build.", tech: ["React"], soon: false },
];

const DESIGN = [
  { slug: "fern-system", title: "Design System ‘Fern’", desc: "Token‑based system.", tech: ["Figma","Design Tokens"], soon: true, type:"design" },
  { slug: "wellness-ui", title: "Wellness App UI", desc: "Hi‑fi prototype.", tech: ["Figma","Prototyping"], soon: true, type:"design" },
];

export default function Projects() {
  const groups = useMemo(() => ([
    { label: "Coding Projects", items: CODING },
    { label: "Design Projects", items: DESIGN },
  ]), []);

  return (
    <section className="projects-index">
      <div className="pi-header">
        <h1>Projects</h1>
        <p>Selected engineering & design work. Click a card for the full case study.</p>
      </div>

      {groups.map((g) => (
        <div className="pi-group" key={g.label}>
          <h2>{g.label}</h2>
          <div className="pi-grid">
            {g.items.map((p) => {
              const linkTo = `/projects/${p.slug}${p.type === "design" ? "?type=design" : ""}`;
              return (
                <Link to={linkTo} className={`pi-card ${p.soon ? "is-soon":""}`} key={p.slug}>
                  <div className="pi-thumb">
                    {p.soon && <span className="pi-badge">Coming soon</span>}
                  </div>
                  <div className="pi-meta">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="pi-chips">
                      {p.tech?.map(t => <span className="pi-chip" key={t}>{t}</span>)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}