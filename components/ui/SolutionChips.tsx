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
  lang = "tr",
  className,
  ikon = true,
}: {
  keys: string[];
  title: string;
  /** Blog ve vakalar bugün yalnızca TR; parametre EN geldiğinde hazır olsun diye. */
  lang?: "tr" | "en";
  className?: string;
  /**
   * Ok işaretleri. 404 sayfasında KAPALI: Next, layout'un `notFound`
   * slot'unu 64 sayfanın HEPSİNİN RSC yüküne gömüyor ve her lucide ikonu
   * orada ~15 proplu bir eleman nesnesi olarak seri hâle geliyor. Ölçüldü:
   * ikonlar 404 ağacının ~%45'i, blog sayfasında +%10,6 gzip. Bedeli 64
   * sayfada ödeniyor, faydası tek sayfada görünüyor.
   */
  ikon?: boolean;
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
            <Link
              key={s.key}
              href={`${lang === "tr" ? "/cozumler" : "/en/solutions"}/${slugOfRef(s, lang)}`}
              className="pill-link"
            >
              {s.label[lang]}
              {ikon && <ArrowRight className="h-4 w-4" />}
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
