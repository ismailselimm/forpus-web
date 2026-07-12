import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionArticle from "@/components/solutions/SolutionArticle";
import { solutions, solutionByEnSlug } from "@/lib/solutions";

const SITE = "https://forpusyazilim.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug.en }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionByEnSlug(slug);
  if (!s) return {};
  const c = s.en;
  const canonical = `${SITE}/en/solutions/${s.slug.en}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
        "tr-TR": `${SITE}/cozumler/${s.slug.tr}`,
        "x-default": `${SITE}/cozumler/${s.slug.tr}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      title: `${c.metaTitle} | Forpus Yazılım`,
      description: c.metaDescription,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionByEnSlug(slug);
  if (!s) notFound();
  return <SolutionArticle solution={s} lang="en" />;
}
