import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";
import { postsByDate } from "@/lib/blog";
import { cases } from "@/lib/cases";
import { SITE_URL as SITE } from "@/lib/site";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

// TR sayfalarının içeriği en son bu tarihte elden geçti (derinleştirme turu).
// Google yeniden taramayı lastmod'a bakarak önceliklendirdiği için, içeriği
// gerçekten değiştirdiğimizde BU TARİHİ GÜNCELLEYİN. Build zamanı kullanmak
// yanlış olur: her deploy "değişti" der, sinyal değersizleşir.
const TR_LASTMOD = new Date("2026-08-25");

// EN sayfaları bu turda değişmedi; kendi tarihini koruyor.
const EN_LASTMOD = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionPages: MetadataRoute.Sitemap = solutions.flatMap((s) => {
    const tr = `${SITE}/cozumler/${s.slug.tr}`;
    const en = `${SITE}/en/solutions/${s.slug.en}`;
    const languages = { tr, en };
    return [
      { url: tr, lastModified: TR_LASTMOD, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
      { url: en, lastModified: EN_LASTMOD, changeFrequency: "monthly", priority: 0.7, alternates: { languages } },
    ];
  });

  const blogPages: MetadataRoute.Sitemap = postsByDate.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.published),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Vaka ve blog sayfalarının tarihi kendi verisinde duruyor; içeriği düzenleyen
  // kişi aynı dosyada görüyor. Elle senkron tutulacak bir sabit yok.
  const casePages: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${SITE}/isler/${c.slug}`,
    lastModified: new Date(c.updated ?? c.published),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  /** Bir koleksiyonun en yeni tarihi — indeks sayfalarının lastmod'u. */
  const newest = (dates: string[]) =>
    new Date(dates.reduce((a, b) => (a > b ? a : b), dates[0]));

  return [
    { url: SITE, lastModified: TR_LASTMOD, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/isler`, lastModified: newest(cases.map((c) => c.updated ?? c.published)), changeFrequency: "monthly", priority: 0.8 },
    ...casePages,
    { url: `${SITE}/blog`, lastModified: newest(postsByDate.map((p) => p.updated ?? p.published)), changeFrequency: "monthly", priority: 0.6 },
    ...blogPages,
    ...solutionPages,
  ];
}
