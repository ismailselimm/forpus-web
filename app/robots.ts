import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

const SITE = "https://forpusyazilim.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
