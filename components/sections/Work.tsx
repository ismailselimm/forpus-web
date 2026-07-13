"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight, Globe } from "lucide-react";
import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";
import WorkVideo from "@/components/sections/WorkVideo";
import { webProjects, type WebProject } from "@/lib/projects";

const ACCENT_HEX: Record<WebProject["accent"], string> = {
  green: "#5fbe2e",
  cyan: "#11cdd9",
  blue: "#1e92e6",
};

/** Derive a clean host label from a project URL (falls back to the raw url). */
function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** The faux browser chrome: traffic-light dots + an address pill. */
function BrowserBar({ host }: { host: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line/80 bg-white/55 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0635a]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5c451]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5fbe2e]/70" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1">
        <Globe className="h-3 w-3 shrink-0 text-ink-3" strokeWidth={2} />
        <span className="truncate font-[family-name:var(--font-mono)] text-[0.7rem] tracking-tight text-ink-3">
          {host}
        </span>
      </div>
    </div>
  );
}

/** Browser-framed screenshot. `priority` only for the featured (above-the-fold) shot. */
function BrowserFrame({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: WebProject;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[var(--r-md)] border border-line bg-white/70 shadow-[var(--shadow-soft)] backdrop-blur-sm",
        className,
      )}
    >
      <BrowserBar host={hostOf(project.url)} />
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-2">
        {project.video ? (
          <WorkVideo
            src={project.video}
            poster={project.shot}
            label={project.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <Image
            src={project.shot}
            alt={project.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        )}
        {/* subtle top sheen to anchor the shot in the frame */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </div>
  );
}

function TagChips({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-white/60 px-3 py-1 text-[0.78rem] font-medium text-ink-2"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function Work() {
  const { t, lang } = useLang();

  const featured = webProjects.find((p) => p.featured);
  const rest = webProjects.filter((p) => p.slug !== featured?.slug);

  return (
    <section id="work" className="section relative overflow-hidden">
      <Aurora className="opacity-40" />
      <div className="container-x relative z-10">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.work.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.work.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-5">{t.work.subtitle}</p>
          </Reveal>
        </div>

        {/* Featured — large 2-column row */}
        {featured ? (
          <Reveal delay={0.12} className="mt-16">
            <article className="group glass-card border-gradient grid items-center gap-8 overflow-hidden p-5 transition-transform duration-500 hover:-translate-y-1.5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <FeaturedFrame project={featured} />
              <div className="lg:pr-4">
                <span className="font-[family-name:var(--font-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
                  {featured.category[lang]}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.3rem)] font-bold tracking-tight text-ink">
                  {featured.name}
                </h3>
                <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-ink-2">
                  {featured.desc[lang]}
                </p>
                <div className="mt-6">
                  <TagChips tags={featured.tags} />
                </div>
                <div className="mt-8">
                  <Magnetic>
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {t.work.visit}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </article>
          </Reveal>
        ) : null}

        {/* Grid of the remaining projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => {
            const lonely = rest.length % 2 === 1 && i === rest.length - 1;
            return (
            <Reveal
              key={project.slug}
              delay={i * 0.08}
              className={clsx("h-full", lonely && "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]")}
            >
              <article className="group glass-card border-gradient relative flex h-full flex-col overflow-hidden p-4 transition-transform duration-500 hover:-translate-y-2 sm:p-5">
                {/* soft accent halo behind the frame, revealed on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-2 -z-[1] h-40 rounded-[var(--r-lg)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(60% 60% at 50% 30%, ${ACCENT_HEX[project.accent]}, transparent 70%)`,
                  }}
                />
                <BrowserFrame
                  project={project}
                  sizes="(max-width: 768px) 92vw, (max-width: 1260px) 46vw, 580px"
                />

                <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-6">
                  <span className="font-[family-name:var(--font-mono)] text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
                    {project.category[lang]}
                  </span>
                  <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[1.3rem] font-bold tracking-tight text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {project.desc[lang]}
                  </p>

                  <div className="mt-5">
                    <TagChips tags={project.tags} />
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 self-start text-[0.92rem] font-semibold text-ink transition-colors hover:text-cyan-deep"
                  >
                    {t.work.visit}
                    <ArrowUpRight className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>

        {/* Closing CTA line */}
        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
          >
            {t.work.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Featured screenshot frame — full bleed inside the card, larger sizes hint + priority load. */
function FeaturedFrame({ project }: { project: WebProject }) {
  return (
    <div className="relative">
      {/* soft accent halo behind the frame */}
      <div
        className="pointer-events-none absolute -inset-4 -z-[1] rounded-[var(--r-lg)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${ACCENT_HEX[project.accent]}, transparent 70%)`,
        }}
      />
      <BrowserFrame
        project={project}
        priority
        sizes="(max-width: 1024px) 92vw, 680px"
      />
    </div>
  );
}
