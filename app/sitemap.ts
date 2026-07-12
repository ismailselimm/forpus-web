import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

const SITE = "https://forpusyazilim.com";
const LASTMOD = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionPages: MetadataRoute.Sitemap = solutions.flatMap((s) => {
    const tr = `${SITE}/cozumler/${s.slug.tr}`;
    const en = `${SITE}/en/solutions/${s.slug.en}`;
    const languages = { tr, en };
    return [
      { url: tr, lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
      { url: en, lastModified: LASTMOD, changeFrequency: "monthly", priority: 0.7, alternates: { languages } },
    ];
  });

  return [
    { url: SITE, lastModified: LASTMOD, changeFrequency: "monthly", priority: 1 },
    ...solutionPages,
  ];
}
