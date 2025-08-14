// src/pages/Coding.jsx
import React, { useMemo, useState } from "react";
import "../components/gallery.css";

const CODING = [
    { 
    slug: "portfolio", 
    title: "Portfolio Website", 
    blurb: "Personal portfolio website showcasing projects, skills, and contact info.",
    tech: ["React", "Vite", "CSS3"], 
    soon: false, 
    previews: [null, null, null, null],
    repo: "https://github.com/makenziemgray/Makenzie-Gray", 
    facts: ["Responsive design", "Projects showcase", "Contact integration"] 
  },
  { 
    slug: "mapsgo", 
    title: "MapsGo", 
    blurb: "Store locator & mapping utility.",
    tech: ["JavaScript", "jQuery", "SQL"], 
    soon: true, 
    previews: [null, null, null, null],
    repo: "#", 
    facts: ["Radius search", "Store filters", "Map markers & clustering"] 
  },
  { 
    slug: "home-hub", 
    title: "Home Hub", 
    blurb: "Household organizer dashboard.",
    tech: ["React"], 
    soon: true, 
    previews: [null, null, null, null],
    repo: "#", 
    facts: ["Chores & scheduling", "Shared lists", "Responsive widgets"] 
  }
];

const uniqueTech = (arr) =>
  Array.from(new Set(arr.flatMap((p) => p.tech || []))).sort();

const GitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.59v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.23 1.85 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.95 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.28-1.56 3.29-1.24 3.29-1.24.66 1.65.24 2.88.12 3.18.77.85 1.24 1.93 1.24 3.25 0 4.63-2.81 5.64-5.49 5.94.44.38.82 1.12.82 2.27v3.37c0 .33.22.71.83.59A12 12 0 0 0 12 .5Z"/>
  </svg>
);

export default function Coding() {
  const [tag, setTag] = useState(null);
  const techs = useMemo(() => uniqueTech(CODING), []);
  const list = useMemo(
    () => (tag ? CODING.filter((p) => p.tech?.includes(tag)) : CODING),
    [tag]
  );

  return (
    <main className="pg-wrap">
      <header className="page-head">
        <h1 className="page-title">Coding Projects</h1>
      </header>



      <div className="rows-wrap">
        {list.map((p) => (
          <article key={p.slug} className="row-card" id={p.slug}>
            <div className="row-media">
              {(p.previews?.length ? p.previews.slice(0,4) : Array(4).fill(null)).map((src,i)=>(
                <div className="mock" key={i}>
                  {i===0 && p.soon && <span className="pg-soon">Coming soon</span>}
                  {src && <img src={src} alt="" loading="lazy" />}
                </div>
              ))}
            </div>

            <div className="row-body">
              <h3 className="row-title">{p.title}</h3>
              <p className="row-blurb">{p.blurb}</p>

              {/* 🔻 removed the row-level tech chips */}

              {!!p.facts?.length && (
                <ul className="facts-list">
                  {p.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}

              <div className="actions">
                <a className="gh-btn" href={p.repo || "#"} target="_blank" rel="noopener noreferrer">
                  <GitHub /><span>View Code</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}