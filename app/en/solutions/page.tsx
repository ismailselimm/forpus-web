import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { aileyeGore, solutionIndex, slugOfRef } from "@/lib/solution-index";
import { SITE_URL as SITE } from "@/lib/site";

/** Türkçesinin eşi — gerekçesi `app/cozumler/page.tsx` başında yazılı. */
export const metadata: Metadata = {
  title: "Solutions — A Page Built for Your Field",
  description:
    "From dental clinics to logistics firms: 40 industry pages and two software services. Pick your field and see what we build for it.",
  alternates: {
    canonical: "/en/solutions",
    languages: {
      "tr-TR": "/cozumler",
      "en-US": "/en/solutions",
      "x-default": "/cozumler",
    },
  },
};

export default function SolutionsIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forpus Yazılım Solutions",
    url: `${SITE}/en/solutions`,
    inLanguage: "en",
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: solutionIndex.length,
      itemListElement: solutionIndex.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.label.en,
        url: `${SITE}/en/solutions/${slugOfRef(s, "en")}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        className="!pb-14"
        crumbs={[{ label: "Home", href: "/en" }, { label: "Solutions" }]}
        eyebrow="Solutions"
        title="A page built for your field"
        lead="Not every profession needs the same thing. A dental clinic needs booking, a law firm needs to stay inside advertising rules, a freight company needs a quote form that asks the right questions. Start where you are."
      />

      <section className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl">
            {aileyeGore.map((grup, i) => (
              <Reveal key={grup.aile} delay={Math.min(i, 6) * 0.05}>
                <div className="mt-12 first:mt-0">
                  <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-ink">
                    {grup.etiket.en}
                    <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.8rem] font-medium text-ink-3">
                      {grup.refler.length}
                    </span>
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {grup.refler.map((s) => (
                      <li key={s.key}>
                        <Link
                          href={`/en/solutions/${slugOfRef(s, "en")}`}
                          className="pill-link"
                        >
                          {s.label.en}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-ink-3"
                            strokeWidth={2}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
