"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight flow-field / connection network in the brand spectrum.
 * Soft drifting nodes that link to nearby nodes and to the cursor —
 * a quiet visual metaphor for "software = connection".
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#5fbe2e", "#11cdd9", "#1e92e6"];

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let parts: P[] = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(80, Math.round((w * h) / 15000)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.1 + 1,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    build();

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          const f = ((16000 - d2) / 16000) * 0.0007;
          p.vx += dx * f;
          p.vy += dy * f;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.vx *= 0.994;
        p.vy *= 0.994;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.c;
            ctx.globalAlpha = (1 - dist / 120) * 0.16;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 170) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "#11cdd9";
          ctx.globalAlpha = (1 - md / 170) * 0.28;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let running = true;
    const tick = () => {
      render();
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => build());
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave, { passive: true });

    if (reduce) {
      render();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
