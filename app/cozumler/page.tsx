import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { aileyeGore, solutionIndex, slugOfRef } from "@/lib/solution-index";
import { SITE_URL as SITE } from "@/lib/site";

/**
 * Çözüm hub'ı.
 *
 * NEDEN VAR: 42 çözüm sayfasının ebeveyni yoktu. Ölçüldü (2 Eylül 2026):
 * `/cozumler` 301 sonrası 404 dönüyordu, `/blog` için `page.tsx` varken
 * `/cozumler` için yoktu. 42 sayfayı toplayan tek yer footer'dı — yani
 * arama motoru için de ziyaretçi için de gezinilecek bir kat eksikti.
 *
 * NEDEN AİLEYE GÖRE GRUPLU: ana sayfadaki şeritte gruplama yüksekliği
 * azaltmadığı için düz liste kaldı; burada durum tersi — sayfanın tek işi
 * gezinmek ve okuyanın kendi mesleğini bulması, o yüzden `aile` alanı
 * gösterime çıkıyor. Sıra ve etiketler `lib/solution-index.ts`te, eksik
 * aile derleme zamanında yakalanıyor.
 */
export const metadata: Metadata = {
  title: "Çözümler — Sektörünüze Özel Web Sitesi",
  description:
    "Diş hekiminden lojistik firmasına, 40 meslek için hazırlanmış çözüm sayfaları ve iki yazılım hizmeti. Kendi alanınızı seçin, ne yaptığımızı görün.",
  alternates: {
    canonical: "/cozumler",
    languages: {
      "tr-TR": "/cozumler",
      "en-US": "/en/solutions",
      "x-default": "/cozumler",
    },
  },
};

export default function CozumlerIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forpus Yazılım Çözümleri",
    url: `${SITE}/cozumler`,
    inLanguage: "tr",
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: solutionIndex.length,
      itemListElement: solutionIndex.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.label.tr,
        url: `${SITE}/cozumler/${slugOfRef(s, "tr")}`,
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
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Çözümler" }]}
        eyebrow="Çözümler"
        title="Sektörünüze özel bir sayfa"
        lead="Her meslek aynı şeye ihtiyaç duymuyor. Diş hekiminin randevu sistemi, avukatın reklam yasağı, lojistikçinin navlun formu — hangi alandaysanız oradan başlayın."
      />

      <section className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl">
            {aileyeGore.map((grup, i) => (
              <Reveal key={grup.aile} delay={Math.min(i, 6) * 0.05}>
                <div className="mt-12 first:mt-0">
                  <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-ink">
                    {grup.etiket.tr}
                    <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.8rem] font-medium text-ink-3">
                      {grup.refler.length}
                    </span>
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {grup.refler.map((s) => (
                      <li key={s.key}>
                        <Link
                          href={`/cozumler/${slugOfRef(s, "tr")}`}
                          className="pill-link"
                        >
                          {s.label.tr}
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
