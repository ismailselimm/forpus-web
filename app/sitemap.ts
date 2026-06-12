import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

const SITE = "https://forpusyazilim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date("2026-06-07"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
