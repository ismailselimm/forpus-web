import { notFound } from "next/navigation";
import SolutionArticle from "@/components/solutions/SolutionArticle";
import { solutionByTrSlug } from "@/lib/solutions";
import { solutionStaticParams, solutionMetadata } from "@/lib/solution-seo";

export const dynamicParams = false;
export const generateStaticParams = () => solutionStaticParams("tr");
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }) =>
  solutionMetadata("tr", params);

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionByTrSlug(slug);
  if (!s) notFound();
  return <SolutionArticle solution={s} lang="tr" />;
}
