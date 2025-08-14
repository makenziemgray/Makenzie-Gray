import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Projects.css";

const CODING = [
  { slug: "mapsgo", title: "MapsGo", desc: "Store locator & mapping utility.", tech: ["JavaScript","jQuery","SQL"], soon: true },
  { slug: "home-hub", title: "Home Hub", desc: "Household organizer dashboard.", tech: ["React"], soon: true },
  { slug: "petpal", title: "PetPal", desc: "Pet care management.", tech: ["Next.js","Tailwind"], soon: true },
  // LIVE case study
  { slug: "portfolio", title: "This Portfolio", desc: "Earthy/serene React build.", tech: ["React"], soon: false, type: "code" },
];

const DESIGN = [
  { slug: "fern-system", title: "Design System ‘Fern’", desc: "Token-based system.", tech: ["Figma","Design Tokens"], soon: true, type:"design" },
  { slug: "wellness-ui", title: "Wellness App UI", desc: "Hi‑fi prototype.", tech: ["Figma","Prototyping"], soon: true, type:"design" },
];

export default function Projects() {
  const navigate = useNavigate();

  const groups = useMemo(() => ([
    { label: "Coding Projects", items: CODING },
    { label: "Design Projects", items: DESIGN },
  ]), []);

  const handleCardClick = (p, e) => {
    if (p.soon) {
      e.preventDefault();
      return;
    }
    // Build the destination once here so both <Link> and onClick agree
    const to = `/projects/${p.slug}${p.type === "design" ? "?type=design" : ""}`;
    navigate(to);
  };

  return (
    <section className="projects-index">
      <div className="pi-hero">
        <h1>Projects</h1>
        <p>Selected engineering & design work. Click a card for the full case study.</p>
      </div>

      {groups.map((g) => (
        <div className="pi-group" key={g.label}>
          <h2 className="pi-group-title">{g.label}</h2>

          <div className="pi-grid">
            {g.items.map((p) => {
              const to = `/projects/${p.slug}${p.type === "design" ? "?type=design" : ""}`;
              const disabled = p.soon;

              // We still use <Link> for semantic accessibility, but block navigation when disabled
              return (
                <Link
                  key={p.slug}
                  to={disabled ? "#" : to}
                  onClick={(e) => handleCardClick(p, e)}
                  className={`pi-card ${disabled ? "is-soon" : "is-live"}`}
                  aria-disabled={disabled}
                  title={disabled ? "Case study coming soon" : "Open case study"}
                >
                  <div className="pi-thumb">
                    {disabled && <span className="pi-badge">Coming soon</span>}
                  </div>

                  <div className="pi-meta">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>

                    {p.tech?.length ? (
                      <div className="pi-chips">
                        {p.tech.map((t) => (
                          <span className="pi-chip" key={t}>{t}</span>
                        ))}
                      </div>
                    ) : null}
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