import React, { useEffect, useState } from "react";
import "./Nav.css";
import Logo from "../assets/MG-LOGO.svg"; // your Figma-made logo

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p || 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Brand */}
          <a className="logo" href="/" aria-label="Home">
            <img src={Logo} alt="Makenzie Gray logo" />
          </a>

          {/* Desktop links */}
          <div className={`nav-links ${open ? "open" : ""}`}>
            <a href="/#projects">Projects</a>
            <a href="/about">About</a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile panel */}
        <div className={`mobile-panel ${open ? "open" : ""}`}>
          <a href="/#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="/about" onClick={() => setOpen(false)}>About</a>
        </div>

        {/* Scroll progress */}
        <div className="progress" style={{ width: `${progress}%` }} />
      </nav>

      {/* Spacer to offset fixed nav height */}
      <div className="nav-spacer" aria-hidden="true" />
    </>
  );
}