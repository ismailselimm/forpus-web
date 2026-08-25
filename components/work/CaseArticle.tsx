import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { caseUi, cases, type CaseStudy } from "@/lib/cases";
import { solutionIndex } from "@/lib/solution-index";
import { webProjects, type WebProject } from "@/lib/projects";
import { SITE_URL as SITE } from "@/lib/site";

/** Sunucuda üretilen vaka sayfası gövdesi. */
export default function CaseArticle({ study, project }: { study: CaseStudy; project: WebProject }) {
  const url = `${SITE}/isler/${study.slug}`;
  const related = solutionIndex.filter((s) => study.relatedSolutions?.includes(s.key));
  const others = cases.filter((c) => c.slug !== study.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: study.h1,
        headline: study.h1,
        description: study.metaDescription,
        url,
        inLanguage: "tr",
        image: `${SITE}${project.shot}`,
        creator: { "@id": `${SITE}/#organization` },
        about: { "@type": "WebSite", name: project.name, url: project.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: caseUi.home, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: caseUi.work, item: `${SITE}/isler` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Başlık ───────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 !pb-16 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <nav
            aria-label="breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-ink-3"
          >
            <Link href="/" className="transition-colors hover:text-ink">{caseUi.home}</Link>
            <span aria-hidden>/</span>
            <Link href="/isler" className="transition-colors hover:text-ink">{caseUi.work}</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{project.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <Reveal>
              <div>
                <span className="eyebrow">{project.category.tr}</span>
                <h1 className="h-section mt-5 text-balance">{study.h1}</h1>
                <p className="lead mt-6">{study.summary}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-white/70 px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-ink-3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Magnetic>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {caseUi.visit}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-card)] ring-1 ring-white/40"
              >
                <Image
                  src={project.shot}
                  alt={`${project.name} web sitesi`}
                  width={1760}
                  height={1100}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Neye ihtiyaç vardı ───────────────────────────── */}
      <section className="section relative overflow-hidden !pb-0">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-balance">{caseUi.challengeTitle}</h2>
            </Reveal>
            <Reveal>
              <div className="mt-8 flex flex-col gap-5">
                {study.challenge.map((p, i) => (
                  <p key={i} className="text-[1.03rem] leading-relaxed text-ink-2">{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Ne kurduk ────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-balance">{caseUi.builtTitle}</h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-4">
              {study.built.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-white/70 p-5 shadow-[var(--shadow-soft)] sm:p-6">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green via-cyan to-blue text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight text-ink">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">{b.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {study.highlight && (
              <Reveal>
                <aside className="mt-10 rounded-[var(--r-lg)] border border-line bg-gradient-to-br from-cyan/[0.08] to-green/[0.05] p-6 sm:p-8">
                  <span className="eyebrow">Öne çıkan</span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] font-bold tracking-tight text-ink text-balance">
                    {study.highlight.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{study.highlight.body}</p>
                </aside>
              </Reveal>
            )}

            {study.takeaway && (
              <Reveal>
                <div className="mt-14">
                  <h2 className="h-section text-balance">{study.takeaway.title}</h2>
                  <div className="mt-7 flex flex-col gap-5">
                    {study.takeaway.body.map((p, i) => (
                      <p key={i} className="text-[1.03rem] leading-relaxed text-ink-2">{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {related.length > 0 && (
              <Reveal>
                <div className="mt-14">
                  <h2 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold tracking-tight text-ink">
                    {caseUi.relatedTitle}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {related.map((s) => (
                      <Link
                        key={s.key}
                        href={`/cozumler/${s.slug.tr}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-medium text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none"
                      >
                        {s.label.tr}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── Diğer işler ──────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 !pt-0">
        <div className="container-x relative z-10">
          <Reveal>
            <h2 className="h-section mb-10 text-center text-balance">{caseUi.otherTitle}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => {
              const p = webProjects.find((w) => w.slug === o.slug);
              if (!p) return null;
              return (
                <Reveal key={o.slug} delay={i * 0.06} className="h-full">
                  <Link
                    href={`/isler/${o.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-white/70 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transform-none"
                  >
                    <Image
                      src={p.shot}
                      alt={p.name}
                      width={1760}
                      height={1100}
                      sizes="(max-width: 640px) 92vw, 320px"
                      className="h-auto w-full"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-[family-name:var(--font-display)] text-[1rem] font-bold tracking-tight text-ink">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                        {p.category.tr}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden !pt-0">
        <div className="container-x relative z-10">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[var(--r-lg)] px-7 py-14 text-center shadow-[var(--shadow-card)] sm:px-12 sm:py-16"
              style={{ background: "var(--grad-ink)" }}
            >
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-green/15 blur-3xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-[family-name:var(--font-display)] text-[1.7rem] font-extrabold tracking-tight !text-white sm:text-[2.2rem]">
                  {caseUi.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/75">{caseUi.ctaText}</p>
                <div className="mt-8 flex justify-center">
                  <Magnetic>
                    <a href="/#contact" className="btn btn-primary">
                      {caseUi.ctaButton}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
