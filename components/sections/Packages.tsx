"use client";

import { Check, Clock, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";
import { presetService, type ServiceKey } from "@/lib/services";

const FEATURED_KEY = "kurumsal";

// Which contact-form service each package preselects (config, keyed by package key).
const PKG_SERVICE: Record<string, ServiceKey> = {
  baslangic: "web",
  kurumsal: "web",
  premium: "all",
};

type Package = {
  key: string;
  name: string;
  tagline: string;
  timeline: string;
  features: string[];
  cta: string;
};

function PackageCard({ pkg, badge }: { pkg: Package; badge: string }) {
  const featured = pkg.key === FEATURED_KEY;
  const service = PKG_SERVICE[pkg.key] ?? "all";

  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] p-5 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 lg:p-8",
        featured
          ? "text-white ring-1 ring-cyan/30"
          : "glass-card border-gradient text-ink",
      )}
      style={featured ? { background: "var(--grad-ink)" } : undefined}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-14 h-52 w-52 rounded-full bg-cyan/20 blur-3xl"
        />
      )}

      <div className="relative flex h-full flex-col">
        {featured && (
          <span
            className="mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white shadow-[var(--shadow-glow)]"
            style={{ background: "var(--grad-brand)" }}
          >
            {badge}
          </span>
        )}
        <h3
          className={clsx(
            "font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight sm:text-[1.6rem]",
            featured ? "!text-white" : "text-ink",
          )}
        >
          {pkg.name}
        </h3>
        <p className={clsx("mt-2 text-[0.9rem] leading-relaxed sm:text-[0.98rem]", featured ? "text-white/70" : "text-ink-2")}>
          {pkg.tagline}
        </p>

        <span
          className={clsx(
            "mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-[family-name:var(--font-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
            featured ? "border-white/20 bg-white/10 text-cyan" : "border-line bg-white/60 text-ink-3",
          )}
        >
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {pkg.timeline}
        </span>

        <ul className="mt-6 flex-1 space-y-2.5 sm:mt-7 sm:space-y-3.5">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[0.88rem] sm:text-[0.95rem]">
              <span
                className={clsx(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  featured ? "bg-white/10" : "bg-green/10",
                )}
              >
                <Check
                  className={clsx("h-3 w-3", featured ? "text-cyan" : "text-green-deep")}
                  strokeWidth={3}
                />
              </span>
              <span className={featured ? "text-white/85" : "text-ink-2"}>{f}</span>
            </li>
          ))}
        </ul>

        <Magnetic className="mt-8 block" strength={0.2}>
          <a
            href="#contact"
            onClick={() => presetService(service)}
            className={clsx(
              "inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-[0.95rem] font-semibold transition-all duration-300",
              featured
                ? "btn btn-primary"
                : "border border-line bg-white/70 text-ink hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none",
            )}
          >
            {pkg.cta}
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </a>
        </Magnetic>
      </div>
    </article>
  );
}

export default function Packages() {
  const { t } = useLang();
  const p = t.packages;

  return (
    <section id="packages" className="section relative overflow-hidden bg-bg-2/60">
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

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-3">
          {(p.items as Package[]).map((pkg, i) => (
            <Reveal
              key={pkg.key}
              delay={i * 0.08}
              className={clsx("h-full", i === p.items.length - 1 && "col-span-2 lg:col-span-1")}
            >
              <PackageCard pkg={pkg} badge={p.badge} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
