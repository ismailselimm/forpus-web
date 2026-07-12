import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { solutions, type Solution } from "@/lib/solutions";

const SITE = "https://forpusyazilim.com";

/** Server-rendered SEO landing page body (content is static HTML so Google indexes it). */
export default function SolutionArticle({
  solution,
  lang,
}: {
  solution: Solution;
  lang: "tr" | "en";
}) {
  const isTr = lang === "tr";
  const c = isTr ? solution.tr : solution.en;

  const contactHref = "/#contact";
  const homeHref = "/";
  const base = isTr ? "/cozumler" : "/en/solutions";
  const slugOf = (s: Solution) => (isTr ? s.slug.tr : s.slug.en);

  const L = {
    home: isTr ? "Ana Sayfa" : "Home",
    more: isTr ? "Diğer çözümler" : "Other solutions",
    moreLead: isTr
      ? "Başka bir alanda mı çalışıyorsunuz? Size uygun çözümü birlikte bulalım."
      : "Working in a different field? Let's find the right fit together.",
    seeAll: isTr ? "Tüm hizmetleri gör" : "See all services",
  };

  const related = solutions.filter((s) => s.key !== solution.key);
  const url = `${SITE}${base}/${slugOf(solution)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.h1,
        description: c.metaDescription,
        url,
        serviceType: c.h1,
        areaServed: isTr ? "TR" : ["TR", "Worldwide"],
        inLanguage: lang,
        provider: { "@id": `${SITE}/#organization` },
        offers: { "@type": "Offer", url: `${SITE}${contactHref}`, availability: "https://schema.org/InStock" },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.home, item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: c.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          {/* breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">
            <Link href={homeHref} className="transition-colors hover:text-ink">{L.home}</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{c.h1}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div>
                <span className="eyebrow">{c.eyebrow}</span>
                <h1 className="h-section mt-5 text-balance">{c.h1}</h1>
                <p className="lead mt-6 max-w-xl">{c.intro}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a href={contactHref} className="btn btn-primary">
                      {c.ctaButton}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                  <Link
                    href={homeHref}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-5 py-3 text-[0.95rem] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none"
                  >
                    {L.seeAll}
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[440px]">
                <div className="absolute inset-[8%] rounded-[40px] bg-gradient-to-br from-cyan/20 to-blue/10 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-card)] ring-1 ring-white/40">
                  <Image
                    src={solution.image}
                    alt={c.h1}
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          <div className="grid gap-5 md:grid-cols-3">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="h-full">
                <article className="glass-card border-gradient flex h-full flex-col rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] sm:p-7">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)]">
                    <Check className="h-5 w-5" strokeWidth={2.6} />
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold tracking-tight text-ink">{b.title}</h2>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-2">{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50">
        <Aurora className="opacity-40" />
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-center">{c.featuresTitle}</h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {c.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.05}>
                  <li className="flex items-start gap-3 rounded-2xl border border-line bg-white/70 p-4 shadow-[var(--shadow-soft)]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10">
                      <Check className="h-3.5 w-3.5 text-green-deep" strokeWidth={3} />
                    </span>
                    <span className="text-[0.95rem] font-medium text-ink">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ (native <details>, works without JS) ─────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-center">{c.faqTitle}</h2>
            </Reveal>
            <div className="mt-12 flex flex-col gap-3">
              {c.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="group rounded-2xl border border-line bg-white/70 p-5 shadow-[var(--shadow-soft)] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-display)] text-[1.02rem] font-semibold text-ink">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
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
                  {c.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/75">{c.ctaText}</p>
                <div className="mt-8 flex justify-center">
                  <Magnetic>
                    <a href={contactHref} className="btn btn-primary">
                      {c.ctaButton}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related solutions (internal links) ───────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 !pt-0">
        <div className="container-x relative z-10">
          <Reveal>
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold tracking-tight text-ink sm:text-[1.9rem]">{L.more}</h2>
              <p className="lead mt-3">{L.moreLead}</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-2.5">
            {related.map((s) => (
              <Link
                key={s.key}
                href={`${base}/${slugOf(s)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-medium text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-green hover:via-cyan hover:to-blue hover:text-white hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none"
              >
                {(isTr ? s.tr : s.en).h1}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
