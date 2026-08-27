import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/fx/Reveal";
import { postsForSolution } from "@/lib/blog";
import { solutionUi } from "@/lib/solutions";

/**
 * İLGİLİ YAZILAR — sektör sayfasından blog'a giden köprü.
 *
 * NEDEN VAR: iç bağlantı grafiği ölçüldüğünde beş blog yazısının HER
 * BİRİNE tek bir bağlantı geliyordu, o da /blog listesinden. Aynı ölçümde
 * /isler, /blog ve hukuki sayfalar 56 bağlantı alıyordu — çünkü footer
 * sitenin her sayfasında. Yani uzun kuyruk sorgular için en değerli
 * varlığımız, grafiğin en zayıf ucundaydı.
 *
 * Sektör sayfaları site içinde en çok bağlanan ve en çok gösterim alan
 * sayfalar; oradan blog'a bağlantı vermek yazıları grafiğin merkezine
 * çekiyor.
 *
 * ZİYARETÇİ İÇİN DE DOĞRU: "avukat web sitesi" arayıp gelen biri için
 * reklam yasağını anlatan yazı, o sayfadaki en yararlı ikinci adım —
 * satın alma kararının önündeki gerçek soruyu cevaplıyor.
 *
 * YALNIZCA TÜRKÇE: blog tek dilli (`lib/routes.ts`, TR_ONLY_PREFIXES).
 * Kararı `YapilanIsler` gibi çağıranda değil burada tutuyoruz — İngilizce
 * yazı yayınlandığı gün yalnız bu koşul değişecek.
 *
 * Eşleşme yazıların kendi `relatedSolutions` alanından; elle ikinci bir
 * liste tutulsaydı ilk yeniden adlandırmada ayrışırdı.
 */
export default function IlgiliYazilar({
  sektorAnahtari,
  lang,
}: {
  sektorAnahtari: string;
  lang: "tr" | "en";
}) {
  if (lang !== "tr") return null;

  const yazilar = postsForSolution(sektorAnahtari);
  if (yazilar.length === 0) return null;

  const L = solutionUi[lang];

  return (
    <section className="section !pt-0">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[1.3rem] font-bold tracking-tight text-ink">
              {L.yazilarBasligi}
            </h2>
            <p className="mt-2 text-[0.95rem] text-ink-2">{L.yazilarLead}</p>
          </Reveal>

          <div className="mt-6 divide-y divide-line border-t border-line">
            {yazilar.map((y, i) => (
              <Reveal key={y.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${y.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink">{y.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-deep motion-reduce:transform-none" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
