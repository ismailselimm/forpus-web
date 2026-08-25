import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseArticle from "@/components/work/CaseArticle";
import { cases, caseCardBySlug } from "@/lib/cases";
import { shotAt } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = caseCardBySlug(slug);
  if (!c) return {};
  const url = `${SITE_URL}/isler/${c.slug}`;
  const shot = shotAt(c.project.shot, 1120);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Yalnızca Türkçe: Google'a başka dil sürümü olmadığını bildiriyoruz.
    alternates: { canonical: url, languages: { "tr-TR": url, "x-default": url } },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      title: `${c.metaTitle} | Forpus Yazılım`,
      description: c.metaDescription,
      images: [{ url: shot }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = caseCardBySlug(slug);
  // lib/cases.ts eşleşmeyi build'de garantiliyor; bu yalnızca tip daraltması.
  if (!card) notFound();
  return <CaseArticle study={card} project={card.project} />;
}
