"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Aurora from "@/components/fx/Aurora";
import { Reveal } from "@/components/fx/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

export default function Process() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-90px" });
  const lineGrown = reduce || lineInView;

  return (
    <section id="process" className="section relative overflow-hidden bg-bg-2/60">
      <Aurora className="opacity-40" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.process.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.process.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{t.process.subtitle}</p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative mt-20">
          {/* Desktop horizontal connecting line (sits behind the nodes) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[18px] hidden md:block">
            <div className="relative mx-[12.5%] h-px">
              <div
                className="absolute inset-0 rounded-full opacity-25"
                style={{ background: "var(--grad-brand)" }}
              />
              <motion.div
                className="absolute inset-0 origin-left rounded-full"
                style={{ background: "var(--grad-brand)" }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: lineGrown ? 1 : 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Mobile vertical connecting line */}
          <div className="pointer-events-none absolute bottom-3 left-[18px] top-3 w-px md:hidden">
            <div
              className="absolute inset-0 rounded-full opacity-25"
              style={{ background: "var(--grad-brand)" }}
            />
            <motion.div
              className="absolute inset-0 origin-top rounded-full"
              style={{ background: "var(--grad-brand)" }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: lineGrown ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <ol className="grid gap-12 md:grid-cols-4 md:gap-6">
            {t.process.steps.map((step, i) => (
              <Reveal key={step.no} delay={i * 0.1}>
                <li className="group relative flex gap-6 pl-2 md:block md:pl-0">
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <span className="relative flex h-9 w-9 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-90"
                        style={{ background: "var(--grad-brand)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="relative flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[var(--shadow-glow)] ring-4 ring-bg-2/80 transition-transform duration-500 group-hover:scale-110"
                        style={{ background: "var(--grad-brand)" }}
                      >
                        <span className="h-2 w-2 rounded-full bg-white/90" />
                      </span>
                    </span>
                  </div>

                  {/* Body */}
                  <div className="md:mt-7">
                    <span className="block font-[family-name:var(--font-display)] text-5xl font-black leading-none tracking-tight text-gradient md:text-6xl">
                      {step.no}
                    </span>
                    <h3 className="mt-4 text-[1.2rem] font-bold tracking-tight text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-2.5 text-[0.96rem] leading-relaxed text-ink-2 md:max-w-[15rem]">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
