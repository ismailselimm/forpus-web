"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { useLang } from "@/components/providers/LanguageProvider";
import { mobileApps, type MobileApp } from "@/lib/projects";

// Gentle organic vertical stagger (only on the 4-up desktop row).
const OFFSETS = ["lg:-translate-y-6", "lg:translate-y-6", "lg:-translate-y-6", "lg:translate-y-6"];
const FLOAT_DELAYS = ["-0.5s", "-2.8s", "-1.6s", "-4.6s"];

function StoreBadge({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="inline-block transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Image src={src} alt={alt} width={150} height={49} className="h-[42px] w-auto" />
    </a>
  );
}

function PhoneCard({ app, index }: { app: MobileApp; index: number }) {
  const { t, lang } = useLang();

  return (
    <div
      className={clsx(
        "flex flex-col items-center text-center",
        OFFSETS[index % OFFSETS.length],
      )}
    >
      {/* Phone mockup */}
      <div className="animate-float relative" style={{ animationDelay: FLOAT_DELAYS[index % FLOAT_DELAYS.length] }}>
        <div
          aria-hidden="true"
          className="absolute -bottom-7 left-1/2 h-12 w-[78%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-[3.2rem] bg-gradient-to-br from-green/15 via-cyan/15 to-blue/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover/grid:opacity-100"
        />

        {/* outer bezel */}
        <div className="relative w-[200px] rounded-[2.6rem] bg-ink p-[10px] shadow-[var(--shadow-card)] ring-1 ring-white/10 sm:w-[216px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-bg-2">
            <Image
              src={app.shot}
              alt={app.name}
              fill
              sizes="(max-width: 768px) 60vw, 216px"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/15"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1.5 z-10 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-ink/95 shadow-inner ring-1 ring-white/5"
            />
          </div>
          <div aria-hidden="true" className="absolute -left-[2px] top-[88px] h-9 w-[3px] rounded-full bg-ink/70" />
          <div aria-hidden="true" className="absolute -left-[2px] top-[132px] h-9 w-[3px] rounded-full bg-ink/70" />
          <div aria-hidden="true" className="absolute -right-[2px] top-[110px] h-12 w-[3px] rounded-full bg-ink/70" />
        </div>
      </div>

      {/* Caption */}
      <h3 className="mt-12 text-[1.15rem] font-bold tracking-tight text-ink">{app.name}</h3>
      <p className="mt-1.5 max-w-[15rem] text-[0.9rem] leading-relaxed text-ink-2">{app.tagline[lang]}</p>

      {app.comingSoon ? (
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.82rem] font-semibold text-ink-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--grad-brand)" }} />
          </span>
          {t.mobile.comingSoon}
        </span>
      ) : (
        (app.appStore || app.googlePlay) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {app.appStore && (
              <StoreBadge href={app.appStore} src="/badges/appstore.webp" alt={`${app.name} — App Store`} />
            )}
            {app.googlePlay && (
              <StoreBadge href={app.googlePlay} src="/badges/googleplay.webp" alt={`${app.name} — Google Play`} />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default function Mobile() {
  const { t } = useLang();

  return (
    <section id="mobile" className="section relative overflow-hidden bg-bg-2/60">
      <Aurora className="opacity-40" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.mobile.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.mobile.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{t.mobile.subtitle}</p>
          </Reveal>
        </div>

        <div className="group/grid mt-20 grid place-items-start gap-y-20 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-6">
          {mobileApps.map((app, i) => (
            <Reveal key={app.slug} delay={i * 0.1} className="mx-auto">
              <PhoneCard app={app} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
