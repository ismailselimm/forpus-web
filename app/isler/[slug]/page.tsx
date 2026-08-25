import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseArticle from "@/components/work/CaseArticle";
import { cases, caseBySlug } from "@/lib/cases";
import { webProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => cases.map((c) => ({ slug: c.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return {};
  const url = `${SITE_URL}/isler/${c.slug}`;
  const shot = webProjects.find((p) => p.slug === c.slug)?.shot ?? "/og.png";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: url },
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
  const study = caseBySlug(slug);
  const project = webProjects.find((p) => p.slug === slug);
  // Build zamanı kontrol (lib/cases.ts sonu) ikisinin de var olduğunu garantiliyor;
  // bu koruma yalnızca tip daraltması için.
  if (!study || !project) notFound();
  return <CaseArticle study={study} project={project} />;
}
