import type { MetadataRoute } from "next";
import { SITE_URL as SITE } from "@/lib/site";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

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
