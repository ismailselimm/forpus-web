import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import { breadcrumbLd, faqLd, type Crumb } from "@/components/ui/Breadcrumb";
import Contact from "@/components/sections/Contact";
import { iletisimIcerigi } from "@/lib/iletisim";
import type { Lang } from "@/lib/i18n/dictionary";
import { SEHIR, ULKE } from "@/lib/marka";
import { homeFor } from "@/lib/routes";
import { SITE_URL as SITE } from "@/lib/site";
import { solutionUi } from "@/lib/solutions";

/**
 * İLETİŞİM SAYFASI — sitenin kimlik çıpası.
 *
 * Sunucu bileşeni: künye de sorular da statik HTML olarak üretiliyor, yani
 * tarayıcıda JavaScript çalıştırmayan yapay zekâ tarayıcıları (GPTBot,
 * ClaudeBot, PerplexityBot) metnin tamamını görüyor.
 *
 * KÜNYE NEDEN BÖYLE GÖRÜNÜYOR: etiketli satırlar, mono yazı tipi, çerçeveli
 * kutu — bir pazarlama bloğu değil, bir KAYIT gibi. Çünkü öyle: hemen
 * yanındaki JSON-LD birebir aynı şeyi söylüyor. Sektör brief formu da aynı
 * dili konuşuyor; sitede artık "bu yapısal veri" demenin tek bir görsel
 * karşılığı var.
 */
export default function IletisimSayfasi({ lang }: { lang: Lang }) {
  const c = iletisimIcerigi[lang];
  const url = `${SITE}/${c.slug}`;
  const tr = lang === "tr";

  const crumbs: Crumb[] = [
    // Etiket ve adres tek kaynaktan: sayfa "Ana sayfa" yazarak sitenin
    // geri kalanındaki "Ana Sayfa"dan zaten ayrılmıştı.
    { label: solutionUi[lang].home, href: homeFor(lang) },
    { label: c.h1 },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": url,
        url,
        name: c.baslik,
        description: c.aciklama,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
      },
      /*
       * Sorular hem ekranda hem şemada. Google artık ticari sitelerin
       * SSS zengin sonucunu göstermiyor, ama FAQPage yapısal verisi
       * varlığın "şu soruların cevabını biliyor" bilgisini taşıyor ve
       * yapay zekâ aramaları bunu okuyor.
       */
      faqLd(c.sss, `${url}#sss`),
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
        eyebrow={`${SEHIR[lang]}, ${ULKE[lang]}`}
        title={c.h1}
        lead={c.ozet}
      />

      <section className="section !pt-4">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-[family-name:var(--font-mono)] text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-3">
                {c.kunyeBasligi}
              </h2>
              <dl className="mt-4 overflow-hidden rounded-2xl border border-line bg-white/70 backdrop-blur-sm">
                {c.satirlar.map((satir) => (
                  <div
                    key={satir.etiket}
                    className="flex flex-col gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <dt className="shrink-0 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.14em] text-ink-3 sm:w-44">
                      {satir.etiket}
                    </dt>
                    <dd className="text-[0.97rem] text-ink">
                      {satir.href ? (
                        <a
                          href={satir.href}
                          className="underline decoration-cyan/40 underline-offset-4 transition-colors hover:text-cyan-deep"
                        >
                          {satir.deger}
                        </a>
                      ) : (
                        satir.deger
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />

      <section className="section bg-bg-2/50">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-balance">{c.sssBasligi}</h2>
            </Reveal>
            {/* Cevaplar açık: bir soruyu okumak için tıklamak gerekmiyor.
                Katlanmış metin hem ziyaretçiyi bir adım fazla yoruyor hem de
                sayfanın asıl işini — cevabı sayfada bulundurmayı — zayıflatıyor. */}
            <div className="mt-10 space-y-8">
              {c.sss.map((f) => (
                <Reveal key={f.q}>
                  <h3 className="font-display text-[1.15rem] font-bold leading-snug text-ink">
                    {f.q}
                  </h3>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-2">
                    {f.a}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
