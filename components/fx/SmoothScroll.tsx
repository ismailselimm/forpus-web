"use client";

import { useEffect } from "react";
import Lenis from "lenis";

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
        lenis!.scrollTo(el as HTMLElement, { offset: -80, duration: 1.25 });
      };
      document.addEventListener("click", onClick);
    }

    // Land on the right section when arriving from another page ("/#services" from a
    // solution page). The browser can't honor the fragment while the preloader holds
    // the scroll lock, so wait for the lock to release, then scroll (works with or
    // without Lenis, so reduced-motion visitors land correctly too).
    const goTo = (el: HTMLElement) =>
      lenis ? lenis.scrollTo(el, { offset: -80, duration: 1.0 }) : el.scrollIntoView();
    const hashTarget = () => {
      const { hash } = window.location;
      return hash && hash !== "#" ? (document.querySelector(hash) as HTMLElement | null) : null;
    };
    let tries = 0;
    const hashTimer = window.setInterval(() => {
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
    const onHashChange = () => {
      const el = hashTarget();
      if (el) goTo(el);
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (onClick) document.removeEventListener("click", onClick);
      window.clearInterval(hashTimer);
      window.removeEventListener("hashchange", onHashChange);
      lenis?.destroy();
    };
  }, []);

  return null;
}
