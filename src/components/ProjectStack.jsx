// src/components/ProjectStack.jsx
import React, { useEffect, useRef } from "react";
import "./../components/ProjectStack.css";

/**
 * ProjectStack
 * Renders a full-page, scroll-snap stack of projects.
 *
 * props:
 * - title: string
 * - projects: Array<{
 *     slug: string,
 *     title: string,
 *     blurb: string,
 *     hero?: string,          // image/video poster
 *     tech?: string[],
 *     repo?: string,
 *     demo?: string,
 *     soon?: boolean,
 *     overview?: string,
 *     bullets?: string[]
 *   }>
 */
export default function ProjectStack({ title, projects }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const els = rootRef.current.querySelectorAll(".ps-section");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.35 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="ps-wrap" ref={rootRef} aria-label={title}>
      <header className="ps-header">
        <h1 className="ps-title">{title}</h1>
        <p className="ps-subtitle">
          Scroll to move between projects. Each screen shows a hero, tech, links, and an overview.
        </p>
      </header>

      <section className="ps-stack" role="list">
        {projects.map((p, idx) => (
          <article
            role="listitem"
            key={p.slug}
            id={p.slug}
            className={`ps-section ${p.soon ? "is-soon" : ""}`}
            aria-labelledby={`${p.slug}-title`}
          >
            {/* Left: media (sticky) */}
            <div className="ps-media">
              <div className="ps-media-frame">
                {p.soon && <span className="ps-badge">Coming soon</span>}
                {/* swap this <img> for <video> if you add a clip */}
                <img
                  src={
                    p.hero ||
                    "data:image/svg+xml;utf8," +
                      encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='#e9e1d7'/><stop offset='1' stop-color='#d9d0c2'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/></svg>`
                      )
                  }
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: content */}
            <div className="ps-body">
              <h2 id={`${p.slug}-title`} className="ps-name">
                {p.title}
              </h2>
              {p.blurb && <p className="ps-blurb">{p.blurb}</p>}

              {!!p.tech?.length && (
                <div className="ps-tech">
                  {p.tech.map((t) => (
                    <span className="ps-chip" key={`${p.slug}-${t}`}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="ps-links">
                {p.repo ? (
                  <a className="ps-button" href={p.repo} target="_blank" rel="noopener noreferrer">
                    View Code ↗
                  </a>
                ) : (
                  <button className="ps-button muted" disabled>
                    Code soon
                  </button>
                )}
                {p.demo ? (
                  <a className="ps-button ghost" href={p.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo ↗
                  </a>
                ) : (
                  <button className="ps-button ghost muted" disabled>
                    Demo soon
                  </button>
                )}
              </div>

              {p.overview && <p className="ps-overview">{p.overview}</p>}

              {!!p.bullets?.length && (
                <ul className="ps-bullets">
                  {p.bullets.map((b, i) => (
                    <li key={`${p.slug}-b-${i}`}>{b}</li>
                  ))}
                </ul>
              )}

              {/* Optional “next” hint */}
              {idx < projects.length - 1 && (
                <div className="ps-next">
                  <span>Scroll for next</span>
                  <span aria-hidden>↓</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}