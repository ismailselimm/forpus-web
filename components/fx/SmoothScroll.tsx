"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Scroll landing offset so anchored sections clear the fixed navbar.
const SCROLL_OFFSET = -80;

export default function SmoothScroll() {
  const pathname = usePathname();
  // Lenis persists across client navigations (layout never unmounts), so it also keeps its
  // scroll offset — held here so the route-change effect can reset it to the top.
  const lenisRef = useRef<Lenis | null>(null);

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
    }
    lenisRef.current = lenis;

    if (!reduce && lenis) {
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

  // On client navigation to a new page, land at the top — Lenis keeps the previous page's
  // scroll offset otherwise (e.g. clicking a sector pill low on the homepage would open the
  // solution page scrolled down). Skipped when the URL carries a hash, so cross-page anchor
  // links (e.g. "/#services") still land on their section.
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
