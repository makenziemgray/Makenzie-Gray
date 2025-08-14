import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

/* ---------- Data ---------- */
const CODING_PROJECTS = [
    {
    slug: "portfolio",
    title: "This Portfolio",
    desc: "Responsive portfolio site built in React with an earthy/serene theme.",
    tech: ["React"],
    type: "code",
    repo: "https://github.com/makenziemgray/MG-portfolio",
    caseStudy: true,
    comingSoon: false,
  },
  {
    slug: "mapsgo",
    title: "MapsGo",
    desc: "Store locator & mapping utility built with JavaScript, jQuery, and SQL.",
    tech: ["JavaScript", "jQuery", "SQL"],
    type: "code",
    repo: "",
    caseStudy: true,
    comingSoon: true,
  },
  {
    slug: "home-hub",
    title: "Home Hub",
    desc: "Household organizer/dashboard app built with React.",
    tech: ["React"],
    type: "code",
    repo: "",
    caseStudy: true,
    comingSoon: true,
  },
];

const DESIGN_PROJECTS = [
  {
    slug: "fern-system",
    title: "Design System: ‘Fern’",
    desc: "Token‑based style guide with components and accessibility rules.",
    tech: ["Figma", "Design Tokens"],
    type: "design",
    caseStudy: true,
    comingSoon: true,
    figma: "",
    images: ["/assets/fern/cover.png", "/assets/fern/tokens.png", "/assets/fern/components.png"],
    facts: ["Design tokens", "Component library", "WCAG-friendly color ramps"],
    challenges: ["Scale across surfaces", "Naming for tokens"],
    learnings: ["Figma variables", "Design docs for dev parity"],
    outcome: "Shared language and parts, faster delivery.",
  },
  {
    slug: "wellness-ui",
    title: "Mobile App UI – Wellness",
    desc: "High‑fidelity prototype and interaction flows in Figma.",
    tech: ["Figma", "Prototyping"],
    type: "design",
    caseStudy: true,
    comingSoon: true,
    figma: "",
    images: ["/assets/wellness/home.png", "/assets/wellness/tracker.png"],
    facts: ["Onboarding flow", "Micro‑interactions", "Design tokens"],
    challenges: ["Motion that stays calm", "Accessible contrast on pastels"],
    learnings: ["Auto‑layout power", "Prototyping for edge cases"],
    outcome: "Calmer visuals + higher completion rate in user tests.",
  },
];

/* ---------- Inline Icons ---------- */
const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297C5.373.297 0 5.67 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.89-2.26-2.176-2.862-2.176-2.862
    -1.78-1.217.135-1.192.135-1.192 1.967.138 3.002 2.02 3.002 2.02 1.748 2.994 4.584 2.13 5.7 1.63
    .177-1.266.684-2.13 1.243-2.62-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.38 1.235-3.22
    -.124-.304-.536-1.53.117-3.187 0 0 1.01-.323 3.31 1.23.96-.267 1.99-.4 3.01-.404 1.02.004 2.05.137 3.01.404
    2.3-1.553 3.31-1.23 3.31-1.23.653 1.657.241 2.883.118 3.187.77.84 1.236 1.91 1.236 3.22
    0 4.61-2.804 5.624-5.475 5.93.705.61 1.33 1.81 1.33 3.65 0 2.63-.024 4.747-.024 5.392
    0 .32.216.694.825.575C20.565 21.8 24 17.302 24 12 24 5.67 18.627.297 12 .297z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452H16.9v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.369V9h3.4v1.561h.049c.474-.9 1.637-1.852 3.367-1.852 3.6 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a1.973 1.973 0 110-3.946 1.973 1.973 0 010 3.946zM6.813 20.452H3.861V9h2.952v11.452z"/>
  </svg>
);
const GmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 4H3.5C2.67 4 2 4.67 2 5.5v13c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5zM20 6l-8 5L4 6v-1l8 5 8-5v1zm0 12H4v-9l8 5 8-5v9z"/>
  </svg>
);

/* ---------- Component ---------- */
export default function Hero() {
  const [activeTab, setActiveTab] = useState("coding");
  const projects = useMemo(
    () => (activeTab === "coding" ? CODING_PROJECTS : DESIGN_PROJECTS),
    [activeTab]
  );
  const navigate = useNavigate();

  /* Toast (copy feedback + a11y) */
  const showToast = (title) => {
    const el = document.querySelector(".toast");
    if (!el) return;
    el.querySelector(".toast-title").textContent = title;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2000);
  };
  const copyToClipboard = async (text, title) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(title);
    } catch {
      showToast("Could not copy");
    }
  };

  /* Reveal-on-scroll */
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) {
      cards.forEach((c) => c.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [projects]);

  /* Subtle parallax */
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tiltX", (y * -6).toFixed(2));
        el.style.setProperty("--tiltY", (x * 8).toFixed(2));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--tiltX", "0");
      el.style.setProperty("--tiltY", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* Social */
  const GITHUB = "https://github.com/makenziemgray";
  const LINKEDIN = "https://www.linkedin.com/in/makenzie-gray-aa4478197/";
  const EMAIL = "makenziemgray0102@gmail.com";

  /* ✅ Card click routing — minimal change */
  const handleCardClick = (p) => {
    if (!p) return;

    if (p.type === "code") {
      // Keep a full case‑study page for your live Portfolio
      if (p.slug === "portfolio") {
        navigate(`/projects/portfolio`, { state: p });
      } else {
        // Deep‑link to the specific card on the Coding page
        navigate(`/coding#${p.slug}`);
      }
    } else {
      // Deep‑link to the specific card on the Design page
      navigate(`/design#${p.slug}`);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroRef} style={{ transform: "perspective(1200px)" }}>
        <div className="background-overlay" aria-hidden="true" />
        <div
          className="content"
          style={{
            transform: "rotateX(var(--tiltX, 0deg)) rotateY(var(--tiltY, 0deg))",
            transition: "transform .08s linear",
          }}
        >
          <h1>
            Where Ideas<br /><span>Become Interfaces.</span>
          </h1>
          <p className="tagline">Designing with purpose. Developing with precision.</p>

          <p className="intro">
            Hi, I'm <strong>Makenzie Gray</strong>, a full‑stack developer with an eye for intuitive UX and detail‑driven interfaces.
          </p>
          <p className="intro">
            From concept to code, I collaborate, prototype, and iterate — building products that feel as good as they function.
          </p>

          <div className="cta-buttons">
            <a href="#" className="btn primary" onClick={(e) => e.preventDefault()}>
              📄 View Resume
            </a>
            <a href="#projects" className="btn secondary">See Projects</a>
          </div>

          {/* Social */}
          <div className="social-icons" role="group" aria-label="Contact links">
            <a href={GITHUB} className="icon-btn" title="Visit GitHub" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN} className="icon-btn" title="Visit LinkedIn" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
            <button
              type="button"
              className="icon-btn"
              title="Copy Email Address"
              onClick={() => copyToClipboard(EMAIL, "Email address copied")}
            >
              <GmailIcon />
            </button>
          </div>
        </div>
      </section>

      {/* TOAST */}
      <div className="toast" role="status" aria-live="polite" aria-atomic="true">
        <div className="toast-icon">✔</div>
        <div className="toast-body">
          <div className="toast-title">Copied!</div>
          <div className="toast-detail">You can now paste it anywhere.</div>
        </div>
        <button
          className="toast-close"
          aria-label="Close"
          onClick={() => document.querySelector(".toast")?.classList.remove("show")}
        >
          ×
        </button>
      </div>

      {/* PROJECTS */}
      <section className="projects-switcher" id="projects">
        <div
          className="projects-card"
          role="region"
          aria-labelledby="projects-heading"
          style={{
            transform: "rotateX(calc(var(--tiltX, 0deg) * .3)) rotateY(calc(var(--tiltY, 0deg) * .3))",
            transition: "transform .08s linear",
          }}
        >
          <div className="projects-card-header">
            <h2 id="projects-heading">Projects</h2>

            <div className="tabs" role="tablist" aria-label="Project categories">
              <button
                role="tab"
                aria-selected={activeTab === "coding"}
                className={`tab-btn ${activeTab === "coding" ? "active" : ""}`}
                onClick={() => setActiveTab("coding")}
              >
                💻 Coding
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "design"}
                className={`tab-btn ${activeTab === "design" ? "active" : ""}`}
                onClick={() => setActiveTab("design")}
              >
                🎨 Design
              </button>
            </div>
          </div>

          <div className="projects-panel" role="tabpanel">
            {projects.length > 0 && projects.every((p) => p.comingSoon) && (
              <div className="coming-soon-banner">
                🚀 New project showcases are launching soon — stay tuned!
              </div>
            )}

            <div className="project-grid" ref={gridRef}>
              {projects.map((p) => {
                const clickable = p.caseStudy;
                return (
                  <article
                    key={`${activeTab}-${p.slug}`}
                    className={`project-card ${p.comingSoon ? "is-soon" : ""} ${clickable ? "clickable" : ""}`}
                    tabIndex={clickable ? 0 : -1}
                    aria-label={`${p.title}: ${p.desc}`}
                    onClick={() => clickable && handleCardClick(p)}
                    onKeyDown={(e) => {
                      if (clickable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        handleCardClick(p);
                      }
                    }}
                  >
                    <div className="thumb placeholder" aria-hidden="true">
                      <div className="placeholder-inner">
                        {p.comingSoon && <span className="soon-badge">Coming&nbsp;soon</span>}
                      </div>
                    </div>

                    <div className="meta">
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>

                      {p.tech?.length ? (
                        <div className="tech-chips">
                          {p.tech.map((t) => (
                            <span className="chip" key={t}>{t}</span>
                          ))}
                        </div>
                      ) : null}

                      {clickable && (
                        <div className="actions-row">
                          {p.type === "design" ? (
                            <span className="case-link">Case Study ↗</span>
                          ) : (
                            <span className="case-link">Project Overview ↗</span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}