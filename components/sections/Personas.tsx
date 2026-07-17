"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope,
  Salad,
  Brain,
  ShoppingBag,
  Rocket,
  Anchor,
  UtensilsCrossed,
  Sparkles,
  Scale,
  Building2,
  Check,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";
import { presetService, type ServiceKey } from "@/lib/services";
import { solutions, slugOf, contentOf, sectorName } from "@/lib/solutions";

const ICONS: Record<string, LucideIcon> = {
  doktor: Stethoscope,
  diyetisyen: Salad,
  psikolog: Brain,
  eticaret: ShoppingBag,
  girisimci: Rocket,
  tekne: Anchor,
  restoran: UtensilsCrossed,
  kisiselmarka: Sparkles,
  avukat: Scale,
  emlak: Building2,
};

// Persona → service mapping (language-independent config, keyed by persona key like ICONS).
const SERVICE_FOR: Record<string, ServiceKey> = {
  doktor: "web",
  diyetisyen: "mobile",
  psikolog: "web",
  eticaret: "web",
  girisimci: "all",
  tekne: "web",
  restoran: "web",
  kisiselmarka: "social",
  avukat: "web",
  emlak: "web",
};

type Persona = {
  key: string;
  label: string;
  headline: string;
  pitch: string;
  deliver: string;
  cta: string;
};

function PersonaCard({ persona, deliverLabel }: { persona: Persona; deliverLabel: string }) {
  const Icon = ICONS[persona.key] ?? Sparkles;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] p-5 text-white shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
      {/* thematic background image */}
      <Image
        src={`/generated/personas/${persona.key}.webp`}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        className="absolute inset-0 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 motion-reduce:transform-none"
      />
      {/* light scrim so the photo stays visible; text legibility comes from the text-shadow */}
      <div aria-hidden className="absolute inset-0 bg-ink/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-cyan/15 blur-3xl"
      />

      <div className="relative flex flex-1 flex-col [text-shadow:0_1px_14px_rgba(7,24,46,0.7)]">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 font-[family-name:var(--font-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-cyan backdrop-blur-sm">
          {persona.label}
        </span>

        <h3 className="mt-3 whitespace-pre-line text-[1.15rem] font-bold leading-snug tracking-tight !text-white sm:text-[1.25rem]">
          {persona.headline}
        </h3>

        <p className="mt-2.5 text-[0.92rem] font-medium leading-relaxed text-white">{persona.pitch}</p>

        {/* deliver + CTA pinned to the bottom so equal-height cards align cleanly */}
        <div className="mt-auto">
          <div className="mt-5 flex items-center gap-2 text-[0.84rem] font-medium text-white">
            <Check className="h-3.5 w-3.5 shrink-0 text-cyan" strokeWidth={2.5} />
            <span>
              <span className="font-[family-name:var(--font-mono)] uppercase tracking-wide text-white/75">
                {deliverLabel}{" "}
              </span>
              {persona.deliver}
            </span>
          </div>

          <a
            href="#contact"
            onClick={() => presetService(SERVICE_FOR[persona.key] ?? "all")}
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.86rem] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none"
          >
            {persona.cta}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Personas() {
  const { t, lang } = useLang();
  const p = t.personas;
  const solBase = lang === "tr" ? "/cozumler" : "/en/solutions";

  return (
    <section id="personas" className="section relative overflow-hidden">
      <Aurora className="opacity-50" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{p.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{p.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{p.subtitle}</p>
          </Reveal>
        </div>

        {/* Equal-size cards, 1 → 2 → 3 columns. The wide catch-all fills the last row (no gaps). */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {(p.items as Persona[]).map((persona, i) => (
            <Reveal key={persona.key} delay={Math.min(i, 6) * 0.06} className="h-full">
              <PersonaCard persona={persona} deliverLabel={p.deliverLabel} />
            </Reveal>
          ))}

          {/* Catch-all — spans the remaining columns so the grid always ends flush. */}
          <Reveal delay={Math.min(p.items.length, 7) * 0.06} className="h-full sm:col-span-2">
            <article className="group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-[var(--r-lg)] p-6 text-white shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <Image
                src="/generated/personas/more.webp"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 760px"
                className="absolute inset-0 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
              <div aria-hidden className="absolute inset-0 bg-ink/30" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/15" />
              <div className="relative [text-shadow:0_1px_14px_rgba(7,24,46,0.7)]">
                <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold tracking-tight !text-white sm:text-[1.5rem]">
                  {p.more.title}
                </h3>
                <p className="mt-2 max-w-md text-[0.95rem] font-medium leading-relaxed text-white/90">
                  {p.more.pitch}
                </p>
              </div>
              <Magnetic className="relative shrink-0" strength={0.25}>
                <a href="#contact" onClick={() => presetService("all")} className="btn btn-primary">
                  {p.more.cta}
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </a>
              </Magnetic>
            </article>
          </Reveal>
        </div>

        {/* Compact sector index — links to every SEO solution page without bloating the grid */}
        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold tracking-tight text-ink sm:text-[1.4rem]">
              {p.sectors.title}
            </h3>
            <p className="mx-auto mt-2.5 max-w-lg text-[0.95rem] text-ink-2">{p.sectors.lead}</p>
          </div>
          <ul className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {solutions.map((s) => (
              <li key={s.key}>
                <Link
                  href={`${solBase}/${slugOf(s, lang)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-medium text-ink-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white hover:text-ink hover:shadow-[var(--shadow-soft)] motion-reduce:transform-none"
                >
                  {sectorName[s.key]?.[lang] ?? contentOf(s, lang).h1}
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-3" strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
