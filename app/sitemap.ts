import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";
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

  return [
    { url: SITE, lastModified: TR_LASTMOD, changeFrequency: "monthly", priority: 1 },
    ...solutionPages,
  ];
}
