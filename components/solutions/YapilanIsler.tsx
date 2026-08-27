import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/fx/Reveal";
import { casesForSolution } from "@/lib/cases";
import { shotAt } from "@/lib/projects";

/**
 * BU ALANDA YAPTIĞIMIZ İŞLER — brief formunun hemen üstündeki kanıt.
 *
 * Çözüm sayfaları dokuz vaka sayfasının hiçbirine bağlanmıyordu. İki bedeli
 * vardı: aramada sitenin en özgün dokuz sayfasına yalnız /isler listesinden
 * ve footer'dan bağlanılıyordu; ekranda ise sayfa ziyaretçiden bir brief
 * istiyor ama karşılığında yaptığımız tek bir iş göstermiyordu.
 *
 * FORMUN HEMEN ÜSTÜNDE, çünkü sıra önemli: önce kanıt, sonra istek.
 *
 * YALNIZCA TÜRKÇE SAYFALARDA. Vaka sayfaları tek dilli (`lib/routes.ts`,
 * TR_ONLY_PREFIXES); İngilizce bir sayfadan Türkçe metne bağlamak ziyaretçiyi
 * anlamadığı bir sayfaya düşürürdü. İngilizce vakalar yayınlandığında bu
 * koşul kalkacak.
 *
 * Eşleşme `relatedSolutions`ten türetiliyor — vakaların zaten yazdığı ilişki.
 * Bu sektörün vakası yoksa bölüm hiç çizilmiyor: boş bir "işlerimiz" başlığı,
 * kanıt vermek şöyle dursun, olmadığını duyurur.
 */
export default function YapilanIsler({
  sektorAnahtari,
  sektorEtiketi,
}: {
  sektorAnahtari: string;
  sektorEtiketi: string;
}) {
  const isler = casesForSolution(sektorAnahtari);
  if (isler.length === 0) return null;

  return (
    <section className="section bg-bg-2/50">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Gerçek işler</span>
          <h2 className="h-section mt-5 max-w-2xl text-balance">
            {sektorEtiketi} tarafında yaptığımız işler
          </h2>
          <p className="lead mt-5 max-w-2xl">
            Ekran görüntüsü değil, canlı siteler. Her birinin neye ihtiyaç
            duyduğunu ve ne kurduğumuzu ayrı ayrı yazdık.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isler.map((is, i) => (
            <Reveal key={is.slug} delay={i * 0.06}>
              <Link
                href={`/isler/${is.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-white/70 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] motion-reduce:transform-none"
              >
                <Image
                  src={shotAt(is.project.shot, 640)}
                  alt={`${is.project.name} web sitesi`}
                  width={640}
                  height={400}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-ink">
                    {is.project.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-ink-2">
                    {is.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-cyan-deep">
                    İşi incele
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
