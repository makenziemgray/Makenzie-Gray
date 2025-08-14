import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./gallery.css";

/**
 * Generic Gallery
 * props:
 * - title: string ("Coding Projects")
 * - items: [{ slug, title, blurb, tech[], soon?, caseStudy?, preview? }]
 * - basePath: string (e.g., "/projects" or "/designs")
 * - subtitle?: string
 */
export default function Gallery({ title, subtitle, items, basePath }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  // Build unique tag list from tech
  const allTags = useMemo(() => {
    const s = new Set();
    items.forEach(i => (i.tech || []).forEach(t => s.add(t)));
    return ["All", ...Array.from(s).sort()];
  }, [items]);

  // Filter by search + tags
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(it => {
      const qOk =
        !q ||
        it.title.toLowerCase().includes(q) ||
        (it.blurb || "").toLowerCase().includes(q) ||
        (it.tech || []).some(t => t.toLowerCase().includes(q));

      const tagOk =
        activeTags.length === 0 ||
        activeTags.every(t => (it.tech || []).includes(t));

      return qOk && tagOk;
    });
  }, [items, query, activeTags]);

  const toggleTag = (tag) => {
    if (tag === "All") {
      setActiveTags([]);
      return;
    }
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="pg-wrap">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">{title}</h1>
          {subtitle && <p className="pg-subtitle">{subtitle}</p>}
        </div>
        <div className="pg-actions">
          <input
            className="pg-search"
            placeholder="Search projects, tech…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="pg-chipbar">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`pg-chip ${activeTags.includes(tag) || (tag === "All" && activeTags.length === 0) ? "on" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div> 

      <div className="pg-grid">
        {filtered.map((p) => {
          const clickable = p.caseStudy && !p.soon;
          const to = `${basePath}/${p.slug}`;
          return (
            <article
              key={p.slug}
              className={`pg-card ${clickable ? "clickable" : ""}`}
            >
              <div className="pg-thumb">
                {p.soon && <span className="pg-soon">Coming soon</span>}
                <img
                  src={p.preview || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'/>"}
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="pg-meta">
                <h3 className="pg-name">{p.title}</h3>
                {p.blurb && <p className="pg-blurb">{p.blurb}</p>}

                {!!p.tech?.length && (
                  <div className="pg-tech">
                    {p.tech.map(t => (
                      <span className="pg-techchip" key={t}>{t}</span>
                    ))}
                  </div>
                )}

                <div className="pg-row">
                  {clickable ? (
                    <Link className="pg-button" to={to}>
                      View Details
                      <span aria-hidden> ↗</span>
                    </Link>
                  ) : (
                    <button className="pg-button disabled" disabled>
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}