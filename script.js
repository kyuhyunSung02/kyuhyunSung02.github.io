(function () {
  "use strict";

  /* ── Footer year ─────────────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Active nav link on scroll ───────────────────────────── */
  const sections = document.querySelectorAll("main section[id]");
  const allNavLinks = document.querySelectorAll(".nav-link");
  const NAV_H = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    10
  ) || 64;

  function setActiveLink() {
    let currentId = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - NAV_H - 8) {
        currentId = sec.id;
      }
    });
    allNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ── Scroll reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach((el) => el.classList.add("visible"));
  }
})();
