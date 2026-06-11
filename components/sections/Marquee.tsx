"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";
import { brandLogos } from "@/lib/projects";

export default function Marquee() {
  const { t } = useLang();
  const scroller = useRef<HTMLDivElement>(null);

  // Render the list twice so the auto-scroll loops seamlessly (wrap at half width).
  const track = [...brandLogos, ...brandLogos];

  // Auto-scroll via native scrollLeft (not CSS transform) so the strip stays
  // hand-swipeable on touch: dragging pauses it, releasing resumes it.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let paused = false;
    let last = 0;
    let offset = el.scrollLeft; // precise position kept in JS (scrollLeft rounds sub-pixels away)
    let resumeTimer: ReturnType<typeof setTimeout>;

    const step = (now: number) => {
      const half = el.scrollWidth / 2;
      if (last && !paused && half > 0) {
        // time-based (frame-rate independent): one full loop in 38s, like the old CSS
        offset += (half / 38) * ((now - last) / 1000);
        if (offset >= half) offset -= half; // seamless wrap
        el.scrollLeft = offset;
      }
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pauseNow = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeSoon = (delay: number) => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        offset = el.scrollLeft; // re-sync after the user hand-scrolled, so it continues from here
        paused = false;
      }, delay);
    };

    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && pauseNow();
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && resumeSoon(150);
    const onUp = () => resumeSoon(1600); // let touch momentum settle before resuming
    const onWheel = () => {
      pauseNow();
      resumeSoon(900);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", pauseNow);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", pauseNow);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section
      id="brands"
      className="section relative overflow-hidden border-y border-line !py-14 md:!py-16"
    >
      <div className="container-x relative z-10">
        <Reveal>
          <div className="flex justify-center">
            <span className="eyebrow">{t.marquee.label}</span>
          </div>
        </Reveal>
      </div>

      {/* Logos placed directly (no frame), corners rounded. Auto-scrolls and is hand-swipeable. */}
      <Reveal delay={0.08}>
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent sm:w-40" />

          <div
            ref={scroller}
            className="flex w-full items-center overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {track.map((b, i) => {
              const isClone = i >= brandLogos.length;
              const cls = "mr-12 flex shrink-0 items-center sm:mr-16";
              const img = (
                <Image
                  src={b.src}
                  alt={b.name}
                  width={240}
                  height={96}
                  draggable={false}
                  className="h-16 w-auto select-none rounded-2xl object-contain transition-transform duration-300 hover:scale-[1.07] sm:h-[76px]"
                />
              );
              return b.url ? (
                <a
                  key={`${b.name}-${i}`}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={b.name}
                  aria-hidden={isClone ? true : undefined}
                  tabIndex={isClone ? -1 : undefined}
                  className={cls}
                >
                  {img}
                </a>
              ) : (
                <div
                  key={`${b.name}-${i}`}
                  title={b.name}
                  aria-hidden={isClone ? true : undefined}
                  className={cls}
                >
                  {img}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
