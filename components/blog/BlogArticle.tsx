import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronDown, Info } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import { blogUi, type BlogPost } from "@/lib/blog";
import { solutionIndex } from "@/lib/solution-index";
import { SITE_URL as SITE } from "@/lib/site";

/** Sunucuda üretilen yazı gövdesi — içerik statik HTML, Google doğrudan okuyor. */
export default function BlogArticle({ post }: { post: BlogPost }) {
  const url = `${SITE}/blog/${post.slug}`;
  const related = solutionIndex.filter((s) => post.relatedSolutions?.includes(s.key));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        url,
        mainEntityOfPage: url,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        inLanguage: "tr",
        image: `${SITE}/og.png`,
        author: { "@id": `${SITE}/#organization` },
        publisher: { "@id": `${SITE}/#organization` },
      },
      ...(post.faq
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: blogUi.home, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: blogUi.title, item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Başlık ───────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 !pb-14 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <nav
            aria-label="breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-ink-3"
          >
            <Link href="/" className="transition-colors hover:text-ink">{blogUi.home}</Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="transition-colors hover:text-ink">{blogUi.title}</Link>
          </nav>

          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{post.tag}</span>
                <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                  {post.readingMinutes} {blogUi.readingSuffix}
                </span>
              </div>
              <h1 className="h-section mt-5 text-balance">{post.title}</h1>
              <p className="lead mt-6">{post.excerpt}</p>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                <time dateTime={post.updated ?? post.published}>
                  {post.updated ? `${blogUi.updatedPrefix} ` : ""}
                  {formatDate(post.updated ?? post.published)}
                </time>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gövde ────────────────────────────────────────── */}
      <article className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-col gap-5">
                {post.intro.map((p, i) => (
                  <p key={i} className="text-[1.06rem] leading-relaxed text-ink-2">{p}</p>
                ))}
              </div>
            </Reveal>

            {post.sections.map((s) => (
              <section key={s.heading} className="mt-16">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.55rem] font-extrabold tracking-tight text-ink text-balance sm:text-[1.95rem]">
                    {s.heading}
                  </h2>
                </Reveal>

                {s.body && (
                  <Reveal>
                    <div className="mt-6 flex flex-col gap-5">
                      {s.body.map((p, i) => (
                        <p key={i} className="text-[1.03rem] leading-relaxed text-ink-2">{p}</p>
                      ))}
                    </div>
                  </Reveal>
                )}

                {s.table && (
                  <Reveal>
                    {/* Geniş içerik kendi kutusunda kayar; sayfa gövdesi yana kaymaz. */}
                    <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white/70 shadow-[var(--shadow-soft)]">
                      <table className="w-full min-w-[560px] border-collapse text-left text-[0.92rem]">
                        {s.table.caption && (
                          <caption className="px-5 pt-5 text-left text-[0.85rem] text-ink-3">
                            {s.table.caption}
                          </caption>
                        )}
                        <thead>
                          <tr>
                            {s.table.head.map((h) => (
                              <th
                                key={h}
                                scope="col"
                                className="border-b border-line px-5 py-3.5 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink-3"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row) => (
                            <tr key={row[0]} className="border-b border-line last:border-b-0">
                              {row.map((cell, i) => (
                                <td
                                  key={i}
                                  className={
                                    i === 0
                                      ? "px-5 py-3.5 font-semibold text-ink"
                                      : "px-5 py-3.5 text-ink-2"
                                  }
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>
                )}

                {s.bullets && (
                  <div className="mt-8 flex flex-col gap-4">
                    {s.bullets.map((b, i) => (
                      <Reveal key={b.title} delay={i * 0.04}>
                        <div className="rounded-2xl border border-line bg-white/70 p-5 shadow-[var(--shadow-soft)] sm:p-6">
                          <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight text-ink">
                            {b.title}
                          </h3>
                          <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">{b.body}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}

                {s.callout && (
                  <Reveal>
                    <aside className="mt-8 flex gap-4 rounded-2xl border border-line bg-gradient-to-br from-cyan/[0.07] to-green/[0.05] p-5 sm:p-6">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green via-cyan to-blue text-white">
                        <Info className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight text-ink">
                          {s.callout.title}
                        </h3>
                        <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">{s.callout.body}</p>
                      </div>
                    </aside>
                  </Reveal>
                )}
              </section>
            ))}

            {/* ── SSS ──────────────────────────────────────── */}
            {post.faq && (
              <section className="mt-20">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-[1.95rem]">
                    {blogUi.faqTitle}
                  </h2>
                </Reveal>
                <div className="mt-8 flex flex-col gap-3">
                  {post.faq.map((f, i) => (
                    <Reveal key={f.q} delay={i * 0.04}>
                      <details className="group rounded-2xl border border-line bg-white/70 p-5 shadow-[var(--shadow-soft)] [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-display)] text-[1.02rem] font-semibold text-ink">
                          {f.q}
                          <ChevronDown className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-2">{f.a}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* ── İlgili çözümler ──────────────────────────── */}
            {related.length > 0 && (
              <section className="mt-20">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold tracking-tight text-ink">
                    {blogUi.relatedTitle}
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
                </Reveal>
              </section>
            )}
          </div>
        </div>
      </article>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden !pt-4">
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
                  {blogUi.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/75">{blogUi.ctaText}</p>
                <div className="mt-8 flex justify-center">
                  <Magnetic>
                    <a href="/#contact" className="btn btn-primary">
                      {blogUi.ctaButton}
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

/** "2026-08-25" → "25 Ağustos 2026". Intl yerine sabit dizi: statik export, tek dil. */
const AYLAR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${AYLAR[Number(m) - 1]} ${y}`;
}
