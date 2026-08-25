import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { cases, caseUi } from "@/lib/cases";
import { webProjects } from "@/lib/projects";
import { SITE_URL as SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "İşler — Gerçek Projeler ve Vaka Çalışmaları",
  description:
    "Yayında olan gerçek projeler: platform, e-ticaret, kurumsal site ve mobil uygulama. Her işin neye ihtiyaç duyduğunu ve ne kurduğumuzu anlattık.",
  alternates: { canonical: "/isler" },
};

export default function WorkIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forpus Yazılım — İşler",
    url: `${SITE}/isler`,
    inLanguage: "tr",
    about: { "@id": `${SITE}/#organization` },
    hasPart: cases.map((c) => ({
      "@type": "CreativeWork",
      name: c.h1,
      url: `${SITE}/isler/${c.slug}`,
      description: c.metaDescription,
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
            <Link href="/" className="transition-colors hover:text-ink">{caseUi.home}</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{caseUi.work}</span>
          </nav>
          <Reveal>
            <span className="eyebrow">Seçili İşler</span>
            <h1 className="h-section mt-5 text-balance">Yayında olan, gerçek projeler.</h1>
            <p className="lead mt-6 max-w-2xl">
              Hepsi şu an internette çalışıyor. Her iş için neye ihtiyaç duyulduğunu, ne kurduğumuzu ve
              hangi kararı neden verdiğimizi yazdık.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((c, i) => {
              const p = webProjects.find((w) => w.slug === c.slug);
              if (!p) return null;
              return (
                <Reveal key={c.slug} delay={i * 0.05} className="h-full">
                  <Link
                    href={`/isler/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-white/70 shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transform-none"
                  >
                    <Image
                      src={p.shot}
                      alt={`${p.name} web sitesi`}
                      width={1760}
                      height={1100}
                      sizes="(max-width: 768px) 92vw, 460px"
                      className="h-auto w-full"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                        {p.category.tr}
                      </span>
                      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.2rem] font-bold tracking-tight text-ink">
                        {p.name}
                      </h2>
                      <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{c.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-blue-deep">
                        Vakayı oku
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
