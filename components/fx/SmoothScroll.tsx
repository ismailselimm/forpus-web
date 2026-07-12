"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Scroll landing offset so anchored sections clear the fixed navbar.
const SCROLL_OFFSET = -80;

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let raf = 0;
    let onClick: ((e: MouseEvent) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });

      const loop = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Smooth same-page anchor navigation (homepage sections)
      onClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis!.scrollTo(el as HTMLElement, { offset: SCROLL_OFFSET, duration: 1.25 });
      };
      document.addEventListener("click", onClick);
    }

    // Scroll to a section (works with or without Lenis, so reduced-motion visitors land too).
    const goTo = (el: HTMLElement) =>
      lenis ? lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.0 }) : el.scrollIntoView();
    const hashTarget = () => {
      const { hash } = window.location;
      return hash && hash !== "#" ? (document.querySelector(hash) as HTMLElement | null) : null;
    };

    // Same-page hash change (e.g. a "/#services" link clicked on the homepage).
    const onHashChange = () => {
      const el = hashTarget();
      if (el) goTo(el);
    };
    window.addEventListener("hashchange", onHashChange);

    // Arriving from another page with a fragment ("/#services" from a solution page):
    // the browser can't honor the fragment while the preloader holds the scroll lock,
    // so poll until the lock releases, then land on the section. Only armed when a hash
    // is actually present, so hashless loads (most visits) schedule nothing.
    let hashTimer = 0;
    if (hashTarget()) {
      let tries = 0;
      hashTimer = window.setInterval(() => {
        const el = hashTarget();
        if (!el || tries++ > 40) {
          window.clearInterval(hashTimer);
          return;
        }
        if (document.body.style.overflow !== "hidden") {
          goTo(el);
          window.clearInterval(hashTimer);
        }
      }, 100);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (onClick) document.removeEventListener("click", onClick);
      if (hashTimer) window.clearInterval(hashTimer);
      window.removeEventListener("hashchange", onHashChange);
      lenis?.destroy();
    };
  }, []);

  return null;
}
