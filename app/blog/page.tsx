import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { postsByDate, blogUi, okumaDakikasi } from "@/lib/blog";
import { SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Fiyat ve Süreç Rehberleri",
  description:
    "Web sitesi ve mobil uygulama fiyatları, teklif alırken dikkat edilecekler, süreç rehberleri. Satış metni değil, işinize yarayacak bilgi.",
  alternates: {
    canonical: "/blog",
    languages: { "tr-TR": "/blog", "x-default": "/blog" },
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        className="!pb-14"
        crumbs={[{ label: blogUi.home, href: "/" }, { label: blogUi.title }]}
        eyebrow={blogUi.eyebrow}
        title={blogUi.title}
        lead={blogUi.lead}
      />

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
                      {okumaDakikasi(p)} {blogUi.readingSuffix}
                    </span>
                  </div>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[1.28rem] font-bold tracking-tight text-ink text-balance">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.96rem] leading-relaxed text-ink-2">
                    {p.excerpt}
                  </p>
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
