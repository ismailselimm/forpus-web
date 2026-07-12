import type { Metadata } from "next";
import { SITE_URL } from "./site";
import { solutions, solutionByTrSlug, solutionByEnSlug } from "./solutions";

type Lang = "tr" | "en";

export function solutionStaticParams(lang: Lang) {
  return solutions.map((s) => ({ slug: lang === "tr" ? s.slug.tr : s.slug.en }));
}

/** Per-page metadata for both the TR and EN solution routes (canonical + hreflang + OG). */
export async function solutionMetadata(lang: Lang, params: Promise<{ slug: string }>): Promise<Metadata> {
  const { slug } = await params;
  const s = lang === "tr" ? solutionByTrSlug(slug) : solutionByEnSlug(slug);
  if (!s) return {};

  const c = lang === "tr" ? s.tr : s.en;
  const trUrl = `${SITE_URL}/cozumler/${s.slug.tr}`;
  const enUrl = `${SITE_URL}/en/solutions/${s.slug.en}`;
  const canonical = lang === "tr" ? trUrl : enUrl;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical,
      languages: { "tr-TR": trUrl, "en-US": enUrl, "x-default": trUrl },
    },
    openGraph: {
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      url: canonical,
      title: `${c.metaTitle} | Forpus Yazılım`,
      description: c.metaDescription,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
