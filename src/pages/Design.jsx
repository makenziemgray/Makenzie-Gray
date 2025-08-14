// src/pages/Design.jsx
import React from "react";
import "../components/gallery.css";

/* ---------- Data ---------- */
const DESIGN = [
    {
    slug: "portfolio-design",
    title: "Portfolio Website Design",
    blurb: "Modern, responsive UI design for personal portfolio.",
    tech: ["Figma", "UI Design"],
    soon: false,
    previews: [null, null, null, null], // Replace nulls with image paths if you have them
    facts: ["Clean and minimalist layout", "Responsive design system", "Consistent branding and typography"],
  },
  {
    slug: "fern-system",
    title: "Design System ‘Fern’",
    blurb: "Token-based system.",
    tech: ["Design Tokens", "Figma"],
    soon: true,
    previews: [null, null, null, null],
    facts: ["Tokens & components", "WCAG-friendly ramps", "Docs for dev parity"],
  },
  {
    slug: "wellness-ui",
    title: "Wellness App UI",
    blurb: "Hi-fi prototype.",
    tech: ["Figma", "Prototyping"],
    soon: true,
    previews: [null, null, null, null],
    facts: ["Onboarding flow", "Calm motion", "Usability-tested"],
  },
];

export default function Design() {
  return (
    <main className="pg-wrap">
      <header className="page-head">
        <h1 className="page-title">Design Projects</h1>
      </header>

      {/* No chip/category bar on Design */}

      <div className="rows-wrap">
        {DESIGN.map((p) => (
          <article key={p.slug} className="row-card" id={p.slug}>
            {/* 2×2 mosaic (left) */}
            <div className="row-media">
              {(p.previews?.length ? p.previews.slice(0, 4) : Array(4).fill(null)).map(
                (src, i) => (
                  <div className="mock" key={i}>
                    {i === 0 && p.soon && <span className="pg-soon">Coming soon</span>}
                    {src && <img src={src} alt="" loading="lazy" />}
                  </div>
                )
              )}
            </div>

            {/* Content (right) */}
            <div className="row-body">
              <h3 className="row-title">{p.title}</h3>
              <p className="row-blurb">{p.blurb}</p>

              <div className="pg-tech">
                {p.tech.map((t) => (
                  <span key={t} className="pg-techchip">
                    {t}
                  </span>
                ))}
              </div>

              {!!p.facts?.length && (
                <ul className="facts-list">
                  {p.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
              {/* No buttons on Design page */}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}