import { notFound } from "next/navigation";
import SolutionArticle from "@/components/solutions/SolutionArticle";
import { solutionByEnSlug } from "@/lib/solutions";
import { solutionStaticParams, solutionMetadata } from "@/lib/solution-seo";

export const dynamicParams = false;
export const generateStaticParams = () => solutionStaticParams("en");
export const generateMetadata = ({ params }: { params: Promise<{ slug: string }> }) =>
  solutionMetadata("en", params);

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionByEnSlug(slug);
  if (!s) notFound();
  return <SolutionArticle solution={s} lang="en" />;
}
