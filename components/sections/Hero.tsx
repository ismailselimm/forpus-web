"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Aurora from "@/components/fx/Aurora";
import ParticleField from "@/components/fx/ParticleField";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { t } = useLang();

  // Giriş animasyonu CSS'te (.hero-in). Eskiden framer-motion ile yapılıyordu,
  // ama hero opacity:0 ile başladığı için içerik JS inene kadar görünmüyordu ve
  // LCP'yi 7 saniye geciktiriyordu. Sıralamayı burada gecikmeyle veriyoruz;
  // eski staggerChildren 0.09s + delayChildren 0.1s ile aynı ritim.
  const stagger = (i: number) => ({ animationDelay: `${0.1 + i * 0.09}s` });

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
        <div>
          <h1 className="display text-balance">
            <span className="hero-in block" style={stagger(0)}>
              {t.hero.titleLead}
            </span>
            <span
              className="hero-in block text-gradient-anim"
              style={stagger(1)}
            >
              {t.hero.titleHighlight}
            </span>
            {t.hero.titleTail ? (
              <span className="hero-in block" style={stagger(2)}>
                {t.hero.titleTail}
              </span>
            ) : null}
          </h1>

          <p className="hero-in lead mt-7 max-w-xl" style={stagger(3)}>
            {t.hero.subtitle}
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap items-center gap-3"
            style={stagger(4)}
          >
            <Magnetic>
              <a href="#contact" className="btn btn-primary">
                {t.hero.ctaPrimary}
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
            </Magnetic>
            <a href="#work" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div
            className="hero-in mt-10 flex flex-wrap gap-2.5"
            style={stagger(5)}
          >
            {t.hero.chips.map((c) => (
              <div key={c.value} className="chip">
                <span className="font-semibold text-ink">{c.value}</span>
                <span className="text-ink-3">·</span>
                <span className="text-ink-3">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div
          className="hero-in relative mx-auto block aspect-square w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px]"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="animate-float relative h-full w-full">
            <div className="absolute inset-[6%] rounded-[40px] bg-gradient-to-br from-cyan/20 to-blue/10 blur-2xl" />
            <Image
              src="/generated/hero-device.webp"
              alt="Forpus — web ve mobil ürünler"
              fill
              priority
              // next/image `priority` ile preload'u zaten üretiyor; eksik olan
              // tek şey önceliğin yüksek işaretlenmesiydi.
              fetchPriority="high"
              sizes="(max-width: 1024px) 60vw, 460px"
              className="rounded-[40px] object-cover shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
