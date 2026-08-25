import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { postsByDate, blogUi } from "@/lib/blog";
import { SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Fiyat ve Süreç Rehberleri",
  description:
    "Web sitesi ve mobil uygulama fiyatları, teklif alırken dikkat edilecekler, süreç rehberleri. Satış metni değil, işinize yarayacak bilgi.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Forpus Yazılım Blog",
    url: `${SITE}/blog`,
    inLanguage: "tr",
    publisher: { "@id": `${SITE}/#organization` },
    blogPost: postsByDate.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.published,
      description: p.metaDescription,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 !pb-14 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <nav
            aria-label="breadcrumb"
            className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-ink-3"
          >
            <Link href="/" className="transition-colors hover:text-ink">{blogUi.home}</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{blogUi.title}</span>
          </nav>
          <Reveal>
            <span className="eyebrow">{blogUi.eyebrow}</span>
            <h1 className="h-section mt-5 text-balance">{blogUi.title}</h1>
            <p className="lead mt-6 max-w-2xl">{blogUi.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {postsByDate.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="glass-card border-gradient group flex h-full flex-col rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transform-none sm:p-7"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow">{p.tag}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">
                      {p.readingMinutes} {blogUi.readingSuffix}
                    </span>
                  </div>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.28rem] font-bold tracking-tight text-ink text-balance">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.96rem] leading-relaxed text-ink-2">{p.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-blue-deep">
                    Devamını oku
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
