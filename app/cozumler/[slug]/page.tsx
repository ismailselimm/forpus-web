import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionArticle from "@/components/solutions/SolutionArticle";
import { solutions, solutionByTrSlug } from "@/lib/solutions";

const SITE = "https://forpusyazilim.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug.tr }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionByTrSlug(slug);
  if (!s) return {};
  const c = s.tr;
  const canonical = `${SITE}/cozumler/${s.slug.tr}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical,
      languages: {
        "tr-TR": canonical,
        "en-US": `${SITE}/en/solutions/${s.slug.en}`,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: canonical,
      title: `${c.metaTitle} | Forpus Yazılım`,
      description: c.metaDescription,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionByTrSlug(slug);
  if (!s) notFound();
  return <SolutionArticle solution={s} lang="tr" />;
}
