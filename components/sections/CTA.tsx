"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";

export default function CTA() {
  const { t } = useLang();

  return (
    <section id="cta" className="section relative overflow-hidden">
      <div className="container-x relative z-10">
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[40px] px-7 py-[clamp(60px,9vw,110px)] text-center shadow-[var(--shadow-card)] sm:px-12 md:px-16"
            style={{ background: "var(--grad-ink)" }}
          >
            {/* AI image backdrop */}
            <Image
              src="/generated/hero-flow.png"
              alt=""
              fill
              sizes="(max-width: 1260px) 92vw, 1156px"
              className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-[0.22]"
            />
            {/* dark gradient overlay for readability */}
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,24,46,0.82) 0%, rgba(7,24,46,0.55) 45%, rgba(7,24,46,0.88) 100%)",
              }}
            />
            {/* soft radial glows for atmosphere */}
            <div
              className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(17,205,217,0.45), transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-28 -right-16 -z-10 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(95,190,46,0.4), transparent 70%)" }}
            />

            {/* hairline top sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Foreground content */}
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <span className="eyebrow !text-cyan [&::before]:bg-cyan [&::before]:shadow-[0_0_0_4px_rgba(17,205,217,0.25)]">
                {t.cta.eyebrow}
              </span>

              <h2 className="font-[family-name:var(--font-display)] mt-6 whitespace-pre-line text-balance text-[clamp(2rem,4.6vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.035em] !text-white">
                {t.cta.title}
              </h2>

              <p className="mt-6 max-w-xl text-pretty text-[clamp(1.02rem,1.5vw,1.22rem)] leading-relaxed text-white/70">
                {t.cta.subtitle}
              </p>

              <Magnetic className="mt-10">
                <a href="#contact" className="btn btn-primary text-[1.02rem]">
                  {t.cta.button}
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
