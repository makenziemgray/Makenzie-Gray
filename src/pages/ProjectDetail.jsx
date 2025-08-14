// src/pages/ProjectDetail.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import "./CaseStudy.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <section className="cs-wrap">
        <div className="cs-main">
          <h1>Project not found</h1>
          <p><Link to="/">Back to Projects</Link></p>
        </div>
      </section>
    );
  }

  const {
    title, date, subtitle, tags, overview, features = [],
    techStack = [], learnings = [], outcome, links = {}
  } = project;

  return (
    <section className="cs-wrap">
      <aside className="cs-toc" aria-label="On this page">
        <div className="toc-card">
          <div className="toc-title">On this page</div>
          <a href="#overview">Overview</a>
          <a href="#features">Key Features</a>
          <a href="#tech">Tech Stack</a>
          <a href="#learnings">Challenges & Learnings</a>
          <a href="#outcome">Outcome</a>
        </div>
      </aside>

      <div className="cs-main">
        <header className="cs-header">
          <div className="cs-meta">
            <Link to="/" className="cs-back">← Projects</Link>
            <span className="cs-date">{date}</span>
          </div>
          <h1 className="cs-title">{title}</h1>
          <p className="cs-subtitle">{subtitle}</p>

          <div className="cs-tags">
            {tags?.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>

          <div className="cs-cta">
            {links.demo && (
              <a className="btn demo" href={links.demo} target="_blank" rel="noopener noreferrer">
                Live Demo ↗
              </a>
            )}
            {links.repo && (
              <a className="btn repo" href={links.repo} target="_blank" rel="noopener noreferrer">
                {/* tiny GH icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.7 5.45.7 11.8c0 5 3.25 9.23 7.76 10.72.57.1.78-.25.78-.56 0-.28-.01-1.03-.02-2.02-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.52-.29-5.16-1.26-5.16-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.19.91-.25 1.88-.38 2.84-.39.96.01 1.93.14 2.84.39 2.18-1.5 3.14-1.19 3.14-1.19.62 1.59.23 2.77.11 3.06.73.79 1.17 1.8 1.17 3.04 0 4.36-2.64 5.31-5.17 5.6.41.35.78 1.04.78 2.09 0 1.51-.01 2.73-.01 3.11 0 .31.2.67.81.55 4.5-1.5 7.74-5.72 7.74-10.71C23.3 5.45 18.35.5 12 .5z"/>
                </svg>
                View Code
              </a>
            )}
          </div>
        </header>

        <article className="cs-body">
          <section id="overview" className="cs-section">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section id="features" className="cs-section">
            <h2>Key Features</h2>
            <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
          </section>

          <section id="tech" className="cs-section">
            <h2>Tech Stack</h2>
            <div className="stack-list">
              {techStack.map(t => <span className="stack" key={t}>{t}</span>)}
            </div>
          </section>

          <section id="learnings" className="cs-section">
            <h2>Challenges & Learnings</h2>
            <ul>{learnings.map(l => <li key={l}>{l}</li>)}</ul>
          </section>

          <section id="outcome" className="cs-section">
            <h2>Outcome</h2>
            <p>{outcome}</p>
          </section>
        </article>
      </div>
    </section>
  );
}