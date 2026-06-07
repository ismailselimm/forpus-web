"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Aurora from "@/components/fx/Aurora";
import ParticleField from "@/components/fx/ParticleField";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <Aurora />
      <div className="absolute inset-0 z-0">
        <ParticleField className="h-full w-full opacity-70" />
      </div>
      {/* soft fade to page at the bottom of hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-7 inline-flex">
            <span className="chip border-gradient relative">
              <Sparkles className="h-3.5 w-3.5 text-cyan-deep" />
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="display text-balance">
            <motion.span variants={item} className="block">
              {t.hero.titleLead}
            </motion.span>
            <motion.span variants={item} className="block text-gradient-anim">
              {t.hero.titleHighlight}
            </motion.span>
            {t.hero.titleTail ? (
              <motion.span variants={item} className="block">
                {t.hero.titleTail}
              </motion.span>
            ) : null}
          </h1>

          <motion.p variants={item} className="lead mt-7 max-w-xl">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#contact" className="btn btn-primary">
                {t.hero.ctaPrimary}
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
            </Magnetic>
            <a href="#work" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-2.5">
            {t.hero.chips.map((c) => (
              <div key={c.value} className="chip">
                <span className="font-semibold text-ink">{c.value}</span>
                <span className="text-ink-3">·</span>
                <span className="text-ink-3">{c.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto block aspect-square w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px]"
        >
          <div className="animate-float relative h-full w-full">
            <div className="absolute inset-[6%] rounded-[40px] bg-gradient-to-br from-cyan/20 to-blue/10 blur-2xl" />
            <Image
              src="/generated/hero-device.png"
              alt="Forpus — web ve mobil ürünler"
              fill
              priority
              sizes="(max-width: 1024px) 60vw, 460px"
              className="rounded-[40px] object-cover shadow-[var(--shadow-card)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
