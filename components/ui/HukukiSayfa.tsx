import Link from "next/link";
import { Info } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { breadcrumbLd, type Crumb } from "@/components/ui/Breadcrumb";
import {
  HUKUKI_UI,
  HUKUKI_UYARI,
  type HukukiSayfa as Veri,
} from "@/lib/hukuki";
import { SITE_URL as SITE } from "@/lib/site";

/**
 * Hukuki metinlerin tek kabuğu: gizlilik, KVKK ve kullanım şartları aynı
 * kalıptan çıkıyor.
 *
 * Neden veri odaklı: üç sayfanın da yapısı aynı (başlık → paragraf → liste →
 * tablo). JSX'i üç kez kopyalasaydık, tipografi ilk düzenlemede ayrışırdı —
 * blog ve çözüm sayfalarında yaşanan tam olarak buydu.
 *
 * Sunucu bileşeni: içerik statik HTML olarak üretiliyor, arama motorları ve
 * uygulama mağazası denetçileri metni doğrudan görüyor.
 */
export default function HukukiSayfa({ veri }: { veri: Veri }) {
  const url = `${SITE}/${veri.slug}`;
  const crumbs: Crumb[] = [
    { label: HUKUKI_UI.anaSayfa, href: "/" },
    { label: veri.kisaBaslik },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: veri.baslik,
        description: veri.metaAciklama,
        inLanguage: "tr",
        dateModified: veri.sonGuncelleme,
        isPartOf: { "@id": `${SITE}/#website` },
        publisher: { "@id": `${SITE}/#organization` },
      },
      breadcrumbLd(crumbs, SITE, url),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        className="!pb-12"
        crumbs={crumbs}
        eyebrow={HUKUKI_UI.eyebrow}
        title={veri.baslik}
        lead={veri.ozet}
      >
        <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
          {HUKUKI_UI.sonGuncelleme}:{" "}
          <time dateTime={veri.sonGuncelleme}>
            {tarihMetni(veri.sonGuncelleme)}
          </time>
        </p>
      </PageHero>

      <article className="section relative overflow-hidden !pt-14">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Uyarı her metnin başında ve görünür yerde duruyor. */}
            <Reveal>
              <aside className="flex gap-4 rounded-2xl border border-line bg-gradient-to-br from-cyan/[0.07] to-green/[0.05] p-5 sm:p-6">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green via-cyan to-blue text-white">
                  <Info className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight text-ink">
                    {HUKUKI_UI.uyariBasligi}
                  </h2>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">
                    {HUKUKI_UYARI}
                  </p>
                </div>
              </aside>
            </Reveal>

            {veri.bolumler.map((bolum) => (
              <section key={bolum.baslik} className="mt-14">
                <Reveal>
                  <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] font-extrabold tracking-tight text-ink text-balance sm:text-[1.7rem]">
                    {bolum.baslik}
                  </h2>
                </Reveal>

                {bolum.paragraflar && (
                  <Reveal>
                    <div className="mt-5 flex flex-col gap-4">
                      {bolum.paragraflar.map((p) => (
                        <p
                          key={p}
                          className="text-[1.02rem] leading-relaxed text-ink-2"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                )}

                {bolum.liste && (
                  <Reveal>
                    <ul className="mt-6 flex flex-col gap-3">
                      {bolum.liste.map((madde) => (
                        <li
                          key={madde}
                          className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-green via-cyan to-blue"
                          />
                          <span>{madde}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {bolum.maddeler && (
                  <div className="mt-6 flex flex-col gap-4">
                    {bolum.maddeler.map((madde, i) => (
                      <Reveal
                        key={madde.baslik ?? madde.govde}
                        delay={i * 0.04}
                      >
                        <div className="soft-card p-5 sm:p-6">
                          {madde.baslik && (
                            <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight text-ink">
                              {madde.baslik}
                            </h3>
                          )}
                          <p
                            className={`text-[0.98rem] leading-relaxed text-ink-2 ${madde.baslik ? "mt-2" : ""}`}
                          >
                            {madde.govde}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}

                {bolum.tablo && (
                  <Reveal>
                    {/* Geniş tablo kendi kutusunda kayar; sayfa gövdesi yana kaymaz. */}
                    <div className="mt-6 overflow-x-auto soft-card">
                      <table className="w-full min-w-[560px] border-collapse text-left text-[0.92rem]">
                        {bolum.tablo.aciklama && (
                          <caption className="px-5 pt-5 text-left text-[0.85rem] text-ink-3">
                            {bolum.tablo.aciklama}
                          </caption>
                        )}
                        <thead>
                          <tr>
                            {bolum.tablo.basliklar.map((b) => (
                              <th
                                key={b}
                                scope="col"
                                className="border-b border-line px-5 py-3.5 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink-3"
                              >
                                {b}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bolum.tablo.satirlar.map((satir) => (
                            <tr
                              key={satir[0]}
                              className="border-b border-line last:border-b-0"
                            >
                              {satir.map((hucre, i) => (
                                <td
                                  key={i}
                                  className={
                                    i === 0
                                      ? "px-5 py-3.5 font-semibold text-ink"
                                      : "px-5 py-3.5 text-ink-2"
                                  }
                                >
                                  {hucre}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>
                )}

                {bolum.kapanis && (
                  <Reveal>
                    <div className="mt-5 flex flex-col gap-4">
                      {bolum.kapanis.map((p) => (
                        <p
                          key={p}
                          className="text-[1.02rem] leading-relaxed text-ink-2"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                )}

                {bolum.baglantilar && (
                  <Reveal>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {bolum.baglantilar.map((b) => (
                        <Link
                          key={b.href}
                          href={b.href}
                          className="inline-flex items-center rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-semibold text-ink-2 transition-all hover:-translate-y-0.5 hover:border-cyan hover:text-cyan-deep"
                        >
                          {b.metin}
                        </Link>
                      ))}
                    </div>
                  </Reveal>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

/**
 * "2026-08-25" → "25 Ağustos 2026".
 * Sunucu bileşeni: Intl build sırasında çalışıyor, istemciye hiç gitmiyor.
 * timeZone "UTC" şart — UTC gerisindeki bir derleme sunucusunda tarih bir gün kayar.
 */
const trTarih = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const tarihMetni = (iso: string) => trTarih.format(new Date(iso));
