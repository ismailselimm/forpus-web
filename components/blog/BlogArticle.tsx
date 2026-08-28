import { ChevronDown, Info } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import KisaCevap from "@/components/ui/KisaCevap";
import Aurora from "@/components/fx/Aurora";
import CtaBand from "@/components/ui/CtaBand";
import Breadcrumb, { breadcrumbLd, faqLd } from "@/components/ui/Breadcrumb";
import SolutionChips from "@/components/ui/SolutionChips";
import YaziListesi from "@/components/ui/YaziListesi";
import {
  blogUi,
  type BlogPost,
  okumaDakikasi,
  ilgiliYazilar,
} from "@/lib/blog";
import { SITE_URL as SITE } from "@/lib/site";

/** Sunucuda üretilen yazı gövdesi — içerik statik HTML, Google doğrudan okuyor. */
export default function BlogArticle({ post }: { post: BlogPost }) {
  const url = `${SITE}/blog/${post.slug}`;
  const crumbs = [
    { label: blogUi.home, href: "/" },
    { label: blogUi.title, href: "/blog" },
    { label: post.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        // Kısa `metaDescription`, `shortAnswer` değil. Bir ara `abstract`
        // alanına kısa cevabın tamamı konmuştu; pasaj yazının ilk %5'inde
        // zaten görünür metin olarak durduğu için o kopya sayfaya ~8 KB ham
        // ekliyordu (RSC yükü onu ayrıca iki kez daha yazıyor) ve yeni
        // hiçbir şey söylemiyordu.
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
      post.faq && faqLd(post.faq),
      breadcrumbLd(crumbs, SITE, url),
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Başlık ───────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 !pb-14 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <Breadcrumb items={crumbs} />

          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{post.tag}</span>
                <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                  {okumaDakikasi(post)} {blogUi.readingSuffix}
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

      {/* Cevap önce, açıklama sonra. Sayfa şöyle okunuyor: başlık (soru) →
          özet (vaat) → kısa cevap (cevabın kendisi) → giriş (bağlam) →
          bölümler. Yazının ikisinde zaten "Kısa cevap" başlıklı bir bölüm
          vardı ama içi tabloydu ve sayfanın ortasındaydı.

          ÜST DOLGU SIFIRLANMAZ. Bir ara `!pt-0 !pb-0` verilmişti ve blok
          kahraman bölümünün zemin geçişine YAPIŞIYORDU — renk değişimi
          başlığın hemen üstünden geçiyor, sayfa sıkışık görünüyordu.
          Alt dolgu sıfır kalıyor çünkü gövde (`article`) kendi `!pt-16`sını
          zaten getiriyor; iki dolgu üst üste binmesin. */}
      <KisaCevap icerik={post.shortAnswer} className="!pt-16 !pb-0" />

      {/* ── Gövde ────────────────────────────────────────── */}
      <article className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-col gap-5">
                {post.intro.map((p, i) => (
                  <p
                    key={i}
                    className="text-[1.06rem] leading-relaxed text-ink-2"
                  >
                    {p}
                  </p>
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
                        <p
                          key={i}
                          className="text-[1.03rem] leading-relaxed text-ink-2"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                )}

                {s.table && (
                  <Reveal>
                    {/* Geniş içerik kendi kutusunda kayar; sayfa gövdesi yana kaymaz. */}
                    <div className="mt-8 overflow-x-auto soft-card">
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
                            <tr
                              key={row[0]}
                              className="border-b border-line last:border-b-0"
                            >
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
                        <div className="soft-card p-5 sm:p-6">
                          <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight text-ink">
                            {b.title}
                          </h3>
                          <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">
                            {b.body}
                          </p>
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
                        <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">
                          {s.callout.body}
                        </p>
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
                      <details className="group soft-card p-5 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-display)] text-[1.02rem] font-semibold text-ink">
                          {f.q}
                          <ChevronDown className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-2">
                          {f.a}
                        </p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {/* ── İlgili çözümler ──────────────────────────── */}
            <SolutionChips
              keys={post.relatedSolutions ?? []}
              title={blogUi.relatedTitle}
              className="mt-20"
            />
          </div>
        </div>
      </article>

      {/* ── Bunları da okuyun ────────────────────────────
          Yazıdan yazıya köprü. Ölçüldü: blog yazılarına ortalama 3 bağlantı
          geliyor, sektör sayfaları 30 alıyor — yazılar grafiğin en zayıf
          ucu ve birbirlerine hiç bağlanmıyorlardı. Sıralama ve eşleşme
          `lib/blog.ts`te; burası yalnızca çiziyor. */}
      <YaziListesi
        yazilar={ilgiliYazilar(post)}
        baslik={blogUi.yazilarBasligi}
        lead={blogUi.yazilarLead}
        className="section !pt-0 !pb-4"
      />

      <CtaBand
        title={blogUi.ctaTitle}
        text={blogUi.ctaText}
        button={blogUi.ctaButton}
        className="!pt-4"
      />
    </>
  );
}

/**
 * "2026-08-25" → "25 Ağustos 2026".
 * Bu bileşen sunucu bileşeni, build sırasında çalışıyor — Intl istemciye
 * hiç gitmiyor. timeZone: "UTC" şart, yoksa UTC gerisindeki bir build
 * sunucusunda tarih bir gün geri kayar.
 */
const trDate = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatDate = (iso: string) => trDate.format(new Date(iso));
