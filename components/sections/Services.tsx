"use client";

import { Code2, Smartphone, Megaphone, Palette, Check, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { useLang } from "@/components/providers/LanguageProvider";

const ICONS: Record<string, LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  ads: Megaphone,
  design: Palette,
};

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="section relative overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.services.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.services.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{t.services.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[s.key] ?? Code2;
            return (
              <Reveal key={s.key} delay={i * 0.08}>
                <article className="glass-card border-gradient group relative h-full overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:p-9">
                  {/* index */}
                  <span className="pointer-events-none absolute right-7 top-6 font-[family-name:var(--font-display)] text-5xl font-black text-ink/5 transition-colors group-hover:text-cyan/10">
                    0{i + 1}
                  </span>

                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-[1.45rem] font-bold tracking-tight text-ink">{s.name}</h3>
                  <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-2">{s.desc}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1.5 text-[0.82rem] font-medium text-ink-2"
                      >
                        <Check className="h-3.5 w-3.5 text-green-deep" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
