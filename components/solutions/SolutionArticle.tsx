import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import CtaBand from "@/components/ui/CtaBand";
import Breadcrumb, { breadcrumbLd } from "@/components/ui/Breadcrumb";
import { solutions, contentOf, slugOf, solutionUi, type Solution } from "@/lib/solutions";
import { webProjects } from "@/lib/projects";
import { SITE_URL as SITE } from "@/lib/site";

/** Server-rendered SEO landing page body (content is static HTML so Google indexes it). */
export default function SolutionArticle({
  solution,
  lang,
}: {
  solution: Solution;
  lang: "tr" | "en";
}) {
  const c = contentOf(solution, lang);
  const L = solutionUi[lang];

  const contactHref = "/#contact";
  const homeHref = "/";
  const base = lang === "tr" ? "/cozumler" : "/en/solutions";

  const related = solutions.filter((s) => s.key !== solution.key);
  const url = `${SITE}${base}/${slugOf(solution, lang)}`;

  // Referans bloğu gerçek bir projeye bağlanır; proje bulunamazsa blok çizilmez.
  const caseProject = webProjects.find((p) => p.slug === c.caseRef?.projectSlug);

  // Sayfada fiyat bandı yazıyorsa aynı rakamı yapılandırılmış veriye de koyarız.
  // "₺50.000 – 90.000" → 50000 (TR binlik ayracı nokta olduğu için sadece rakamları alırız).
  const lowPrice = Number(c.pricing?.tiers[0]?.price.match(/[\d.]+/)?.[0].replace(/\./g, "")) || undefined;

  // Bölüm başlığı varsa fayda kartları onun altına iner; yoksa kartlar bölümün kendisidir.
  const CardHeading = c.benefitsTitle ? "h3" : "h2";

  const crumbs = [{ label: L.home, href: "/" }, { label: c.h1 }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.h1,
        description: c.metaDescription,
        url,
        serviceType: c.h1,
        areaServed: lang === "tr" ? "TR" : ["TR", "Worldwide"],
        inLanguage: lang,
        provider: { "@id": `${SITE}/#organization` },
        offers: lowPrice
          ? {
              "@type": "AggregateOffer",
              url: `${SITE}${contactHref}`,
              availability: "https://schema.org/InStock",
              priceCurrency: "TRY",
              lowPrice,
            }
          : { "@type": "Offer", url: `${SITE}${contactHref}`, availability: "https://schema.org/InStock" },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      breadcrumbLd(crumbs, SITE, url),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <Breadcrumb items={crumbs} />

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
                    className="pill-link pill-link-lg"
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

      {/* ── Problem ──────────────────────────────────────── */}
      {c.problem && (
        <section className="section relative overflow-hidden !pb-0">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-balance">{c.problem.title}</h2>
              </Reveal>
              {/* Paragraflar tek Reveal içinde: her birine ayrı IntersectionObserver
                  açmanın görsel karşılığı yok, stagger sadece kartlarda anlamlı. */}
              <Reveal>
                <div className="mt-8 flex flex-col gap-5">
                  {c.problem.body.map((p, i) => (
                    <p key={i} className="text-[1.03rem] leading-relaxed text-ink-2">{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          {c.benefitsTitle && (
            <Reveal>
              <h2 className="h-section mb-12 text-center text-balance">{c.benefitsTitle}</h2>
            </Reveal>
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {c.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08} className="h-full">
                  <article className="glass-card border-gradient flex h-full flex-col rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] sm:p-7">
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)]">
                      <Check className="h-5 w-5" strokeWidth={2.6} />
                    </span>
                    <CardHeading className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold tracking-tight text-ink">
                      {b.title}
                    </CardHeading>
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

      {/* ── Fiyat bandı ──────────────────────────────────── */}
      {c.pricing && (
        <section className="section relative overflow-hidden">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">{c.pricing.title}</h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">{c.pricing.lead}</p>
              </Reveal>

              <div className="mt-12 flex flex-col gap-4">
                {c.pricing.tiers.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.07}>
                    <article className="glass-card border-gradient rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] sm:p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-ink">
                          {t.name}
                        </h3>
                        <div className="flex items-baseline gap-3">
                          <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-extrabold tracking-tight text-ink">
                            {t.price}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
                            {t.timeline}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{t.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="mt-7 text-center text-[0.9rem] leading-relaxed text-ink-3">{c.pricing.note}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Gerçek referans ──────────────────────────────── */}
      {c.caseRef && caseProject && (
        <section className="section relative overflow-hidden bg-bg-2/50">
          <div className="container-x relative z-10">
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
              <Reveal>
                <a
                  href={caseProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-card)] ring-1 ring-white/40"
                >
                  <Image
                    src={caseProject.shot}
                    alt={`${caseProject.name} web sitesi`}
                    width={1760}
                    height={1100}
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </a>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <span className="eyebrow">{caseProject.name}</span>
                  <h2 className="h-section mt-5 text-balance">{c.caseRef.title}</h2>
                  <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-2">{c.caseRef.body}</p>
                  <Link
                    href={`${homeHref}#work`}
                    className="mt-7 pill-link pill-link-lg"
                  >
                    {c.caseRef.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Süreç ────────────────────────────────────────── */}
      {c.process && (
        <section className="section relative overflow-hidden">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">{c.process.title}</h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">{c.process.lead}</p>
              </Reveal>

              {/* Numaralandırma burada bilgi taşıyor: adımlar gerçekten sıralı. */}
              <ol className="mt-12 flex flex-col gap-3">
                {c.process.steps.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.06}>
                    <li className="flex gap-5 soft-card p-5 sm:p-6">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green via-cyan to-blue font-[family-name:var(--font-mono)] text-[0.85rem] font-bold text-white shadow-[var(--shadow-glow)]">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight text-ink">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{s.body}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ── Nelere dikkat etmeli ─────────────────────────── */}
      {c.checklist && (
        <section className="section relative overflow-hidden bg-bg-2/50">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">{c.checklist.title}</h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">{c.checklist.lead}</p>
              </Reveal>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {c.checklist.items.map((it, i) => (
                  <Reveal key={it.title} delay={i * 0.05} className="h-full">
                    <article className="flex h-full flex-col soft-card p-5">
                      <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight text-ink">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-2">{it.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
                  <details className="group soft-card p-5 [&_summary::-webkit-details-marker]:hidden">
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

      <CtaBand title={c.ctaTitle} text={c.ctaText} button={c.ctaButton} />

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
                href={`${base}/${slugOf(s, lang)}`}
                className="pill-link"
              >
                {contentOf(s, lang).h1}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
