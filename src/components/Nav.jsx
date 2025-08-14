// src/components/Nav.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import Logo from "../assets/MG-LOGO.svg";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("resize", closeOnResize, { passive: true });
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link className="logo" to="/" aria-label="Go to Home">
            {/* Keep the img; CSS controls height for crispness */}
            <img src={Logo} alt="MG" />
          </Link>

          <div className={`nav-links ${open ? "open" : ""}`}>
            <NavLink
              to="/coding"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Coding
            </NavLink>
            <NavLink
              to="/design"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Design
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About
            </NavLink>
          </div>

          <button
            className={`hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-panel"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile panel */}
        <div id="mobile-panel" className={`mobile-panel ${open ? "open" : ""}`}>
          <NavLink
            to="/coding"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            onClick={() => setOpen(false)}
          >
            Coding
          </NavLink>
          <NavLink
            to="/design"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            onClick={() => setOpen(false)}
          >
            Design
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
        </div>

        {/* Scroll progress */}
        <div
          className="progress"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-label="Scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        />
      </nav>
    </>
  );
}