"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { useLang } from "@/components/providers/LanguageProvider";

type CountUpProps = {
  value: number;
  suffix: string;
  inView: boolean;
};

function CountUp({ value, suffix, inView }: CountUpProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number>(reduce ? value : 0);
  const startedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;

    if (reduce) {
      setDisplay(value);
      startedRef.current = true;
      return;
    }

    startedRef.current = true;
    const duration = 1600;
    let raf = 0;
    let start: number | null = null;

    const easeOut = (x: number): number => 1 - Math.pow(1 - x, 3);

    const tick = (now: number): void => {
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span className="font-[family-name:var(--font-display)] text-5xl font-black tracking-tight text-gradient md:text-6xl">
      {display}
      <span className="align-top text-3xl md:text-4xl">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();
  const stripRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stripRef, { once: true, amount: 0.4 });

  return (
    <section id="stats" className="section relative overflow-hidden">
      <Aurora className="opacity-40" />
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.stats.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.stats.title}</h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            ref={stripRef}
            className="glass-card mt-12 grid grid-cols-2 gap-y-10 rounded-[var(--r-lg)] p-8 sm:p-10 md:grid-cols-4 md:gap-y-0 md:p-12"
          >
            {t.stats.items.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "relative flex flex-col items-center text-center md:px-6",
                  // mobile (2 cols): left border on right-hand column
                  i % 2 === 1 ? "border-l border-line" : "",
                  // desktop (4 cols): left border on every item except the first
                  i === 0 ? "md:border-l-0" : "md:border-l md:border-line",
                ].join(" ")}
              >
                <CountUp value={s.value} suffix={s.suffix} inView={inView} />
                <span className="mt-3 text-sm font-medium text-ink-2 md:text-base">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
