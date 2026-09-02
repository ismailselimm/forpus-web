import type { MetadataRoute } from "next";
import { solutions, SOLUTIONS_LASTMOD } from "@/lib/solutions";
import { postsByDate } from "@/lib/blog";
import { assertBlogFiyatlari } from "@/lib/fiyat-tutarliligi";
import { cases } from "@/lib/cases";
import { hukukiSayfalar } from "@/lib/hukuki";
import { CEVRILMIS_SAYFALAR } from "@/lib/routes";
import { SITE_URL as SITE } from "@/lib/site";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

// Derleme zamanı tutarlılık kontrolü. Burada çünkü sitemap zaten hem
// çözümleri hem yazıları okuyor ve derleme sırasında bir kez çalışıyor;
// gerekçesi kontrolün kendi dosyasında yazılı.
assertBlogFiyatlari();

// Tarih ve neden build zamanı kullanılmadığı lib/solutions.ts'te, sabitin
// kendi yanında yazılı. İki dil aynı nesnede, aynı turda elden geçiyor:
// tek tarih.
const ICERIK_LASTMOD = new Date(SOLUTIONS_LASTMOD);

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionPages: MetadataRoute.Sitemap = solutions.flatMap((s) => {
    const tr = `${SITE}/cozumler/${s.slug.tr}`;
    const en = `${SITE}/en/solutions/${s.slug.en}`;
    const languages = { tr, en };
    return [
      {
        url: tr,
        lastModified: ICERIK_LASTMOD,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      },
      {
        url: en,
        lastModified: ICERIK_LASTMOD,
        changeFrequency: "monthly",
        // Bir tık altta: Türkiye odaklı bir işletmenin İngilizce sayfası,
        // Türkçesinin önüne geçmemeli. Çevrilmiş sayfalarda da aynı karar.
        priority: 0.7,
        alternates: { languages },
      },
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

  // Hukuki sayfaların tarihi kendi içeriğinin yanında (lib/hukuki.ts) duruyor:
  // metni değiştiren kişi lastmod'u da aynı dosyada görüyor. Öncelik düşük —
  // bu sayfalar aramada yarışmıyor, yalnızca indekste bulunsunlar yeter.
  // Çevrilmiş tekil sayfalar (bugün yalnız iletişim). Elle yazılmış iki giriş
  // ve sayfaya özel bir LASTMOD sabiti vardı; dosyanın geri kalanı gibi artık
  // koleksiyondan türüyor — ikinci bir çevrilmiş sayfa eklendiğinde burada
  // hiçbir şey değişmiyor.
  const cevrilmisPages: MetadataRoute.Sitemap = CEVRILMIS_SAYFALAR.flatMap(
    (c) => {
      const languages = { tr: `${SITE}${c.tr}`, en: `${SITE}${c.en}` };
      const ortak = {
        lastModified: new Date(c.yayin),
        changeFrequency: "monthly" as const,
        alternates: { languages },
      };
      return [
        { url: languages.tr, ...ortak, priority: c.oncelik },
        // EN sürümü bir tık altta: Türkiye odaklı bir işletmenin İngilizce
        // sayfası, Türkçesinin önüne geçmemeli.
        { url: languages.en, ...ortak, priority: c.oncelik - 0.2 },
      ];
    },
  );

  const hukukiPages: MetadataRoute.Sitemap = hukukiSayfalar.map((h) => ({
    url: `${SITE}/${h.slug}`,
    lastModified: new Date(h.sonGuncelleme),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  /** Bir koleksiyonun en yeni tarihi — indeks sayfalarının lastmod'u. */
  const newest = (dates: string[]) =>
    new Date(dates.reduce((a, b) => (a > b ? a : b), dates[0]));

  return [
    {
      url: SITE,
      lastModified: ICERIK_LASTMOD,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { tr: SITE, en: `${SITE}/en` } },
    },
    {
      url: `${SITE}/en`,
      lastModified: ICERIK_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: SITE, en: `${SITE}/en` } },
    },
    {
      // Çözüm hub'ı — 42 çözüm sayfasının ebeveyni. Sayfa 2 Eylül'de
      // açıldı; öncesinde `/cozumler` 404 dönüyordu ve 42 sayfa öksüzdü.
      url: `${SITE}/cozumler`,
      lastModified: ICERIK_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${SITE}/cozumler`,
          en: `${SITE}/en/solutions`,
        },
      },
    },
    {
      url: `${SITE}/en/solutions`,
      lastModified: ICERIK_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${SITE}/cozumler`,
          en: `${SITE}/en/solutions`,
        },
      },
    },
    {
      url: `${SITE}/isler`,
      lastModified: newest(cases.map((c) => c.updated ?? c.published)),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...casePages,
    {
      url: `${SITE}/blog`,
      lastModified: newest(postsByDate.map((p) => p.updated ?? p.published)),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPages,
    ...solutionPages,
    ...cevrilmisPages,
    ...hukukiPages,
  ];
}
