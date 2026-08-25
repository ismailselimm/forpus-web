import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import { solutionIndex, slugOfRef } from "@/lib/solution-index";

/**
 * "İlgili çözümler" pill listesi. Blog ve vaka sayfalarında birebir aynıydı.
 * Anahtarlar build zamanında doğrulanıyor (lib/blog.ts, lib/cases.ts sonu).
 */
export default function SolutionChips({
  keys,
  title,
  className,
}: {
  keys: string[];
  title: string;
  className?: string;
}) {
  const items = solutionIndex.filter((s) => keys.includes(s.key));
  if (items.length === 0) return null;

  return (
    <Reveal>
      <div className={clsx("mt-14", className)}>
        <h2 className="font-[family-name:var(--font-display)] text-[1.3rem] font-bold tracking-tight text-ink">
          {title}
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {items.map((s) => (
            <Link key={s.key} href={`/cozumler/${slugOfRef(s, "tr")}`} className="pill-link">
              {s.label.tr}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
