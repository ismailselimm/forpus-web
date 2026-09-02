import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import {
  aileyeGore,
  cozumYolu,
  HUB_YOLU,
  hubIcerigi,
} from "@/lib/cozumler-hub";
import { solutionUi } from "@/lib/solution-ui";
import { homeFor } from "@/lib/routes";
import { SITE_URL as SITE } from "@/lib/site";
import type { Lang } from "@/lib/i18n/dictionary";

/**
 * Çözüm hub'ının gövdesi — iki dil için tek uygulama.
 *
 * NEDEN TEK GÖVDE: ilk hâli iki route dosyasıydı, 108 ve 95 satır, aralarındaki
 * her fark ya bir metin ya `.tr`/`.en` seçimiydi. `lib/iletisim.ts`in kendi
 * yorumu bu borcu tarif ediyor: "İki sayfa dosyası bloğu satır satır
 * kopyalıyordu… hreflang kuralı değişince üç yer güncellenmesi gerekiyordu."
 * Depoda çift dilli olan her sayfa (iletişim, ana sayfa, çözüm detayı) tek
 * gövde + `lang` propu kullanıyor; hub istisna olamazdı.
 */
export default function CozumlerHub({ lang }: { lang: Lang }) {
  const m = hubIcerigi[lang];

  // JSON-LD ekranla AYNI diziden çiziliyor. Ayrı olsaydı (`solutionIndex.map`)
  // `position` alanı ekrandaki sırayı bildirmezdi ve iki kaynak sessizce
  // ayrışabilirdi.
  const sirali = aileyeGore.flatMap((g) => g.refler);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: m.semaAdi,
    url: `${SITE}${HUB_YOLU[lang]}`,
    inLanguage: lang,
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sirali.length,
      itemListElement: sirali.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.label[lang],
        url: `${SITE}${cozumYolu(s, lang)}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        className="!pb-14"
        crumbs={[
          { label: solutionUi[lang].home, href: homeFor(lang) },
          { label: m.eyebrow },
        ]}
        eyebrow={m.eyebrow}
        title={m.h1}
        lead={m.giris}
      />

      <section className="section relative overflow-hidden !pt-16">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-4xl">
            {aileyeGore.map((grup, i) => (
              // Boşluk sınıfları Reveal'ın KENDİ div'inde. Ayrı bir sarmalayıcıya
              // konulduğunda o div Reveal'ın tek çocuğu oluyordu, yani on bir
              // grubun hepsinde `:first-child` eşleşiyor ve `first:mt-0` hep
              // kazanıyordu — gruplar arası boşluk hiç çizilmiyordu.
              <Reveal
                key={grup.aile}
                delay={Math.min(i, 6) * 0.05}
                className="mt-12 first:mt-0"
              >
                <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-ink">
                  {grup[lang]}
                  <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.8rem] font-medium text-ink-3">
                    {grup.refler.length}
                  </span>
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {grup.refler.map((s) => (
                    <li key={s.key}>
                      <Link href={cozumYolu(s, lang)} className="pill-link">
                        {s.label[lang]}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-ink-3"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
