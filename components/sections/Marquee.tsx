"use client";

import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";
import { brandLogos } from "@/lib/projects";

export default function Marquee() {
  const { t } = useLang();

  // Render the list twice so .animate-marquee (0 -> -50%) loops seamlessly.
  const track = [...brandLogos, ...brandLogos];

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

      {/* Logos placed directly (no frame), corners rounded. Clickable when the brand has a live site. */}
      <Reveal delay={0.08}>
        <div className="group relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent sm:w-40" />

          <div className="animate-marquee flex w-max items-center will-change-transform group-hover:[animation-play-state:paused]">
            {track.map((b, i) => {
              const isClone = i >= brandLogos.length;
              const cls = "mr-12 flex shrink-0 items-center sm:mr-16";
              const img = (
                <Image
                  src={b.src}
                  alt={b.name}
                  width={240}
                  height={96}
                  className="h-16 w-auto rounded-2xl object-contain transition-transform duration-300 hover:scale-[1.07] sm:h-[76px]"
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
