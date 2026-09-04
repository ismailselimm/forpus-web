import Image from "next/image";
import { solutionUi } from "@/lib/solution-ui";
import Link from "next/link";
import { Check, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Magnetic from "@/components/fx/Magnetic";
import SektorBrief from "@/components/solutions/SektorBrief";
import YapilanIsler from "@/components/solutions/YapilanIsler";
import IlgiliYazilar from "@/components/solutions/IlgiliYazilar";
import Breadcrumb, { breadcrumbLd, faqLd } from "@/components/ui/Breadcrumb";
import KisaCevap from "@/components/ui/KisaCevap";
import {
  solutionByKey,
  contentOf,
  slugOf,
  SOLUTIONS_LASTMOD,
  caseRefProject,
  type Solution,
} from "@/lib/solutions";
import { ilgiliRefler, refByKey } from "@/lib/solution-index";
import { cevrilmisSayfa, cevrilmisYol, homeFor } from "@/lib/routes";
import { hubIcerigi } from "@/lib/cozumler-hub";
import { shotAt } from "@/lib/projects";
import { ilkFiyat } from "@/lib/pricing";
import { SITE_URL as SITE } from "@/lib/site";

/** Server-rendered SEO landing page body (content is static HTML so Google indexes it). */
export default function SolutionArticle({
  solution,
  lang,
}: {
  solution: Solution;
  lang: "tr" | "en";
}) {
  const c = contentOf(solution, lang);
  const L = solutionUi[lang];

  // Sayfa içi brief formu. Eskiden ana sayfadaki genel iletişim çıpasına
  // (`/#contact`) gidiyordu: ziyaretçi sayfadan ÇIKIP boş bir metin kutusuna
  // düşüyordu. Artık aynı sayfada, kendi sektörünün formuna iniyor.
  const contactHref = "#brief";

  // Kısa sektör adı `solutionIndex`te kanonik ("Doktor", "Avukat"); burada
  // yeniden yazmak ikinci bir isim kaynağı olurdu.
  const sektorEtiketi = refByKey(solution.key)?.label[lang] ?? c.eyebrow;
  // Dile duyarlı: İngilizce sayfadaki "See all services" Türkçe ana sayfaya
  // gitmemeli. `/en` var ve `base` zaten dile göre seçiliyor.
  const homeHref = homeFor(lang);
  // "Tüm hizmetleri gör" iki yerde çıkıyor: hero'da ve şeridin sonunda.
  // Aynı etiketin iki farklı yere gitmesi kafa karıştırıyordu; ikisi de
  // sektör indeksine gidiyor, çünkü etiketin söz verdiği şey orası.
  const tumHizmetlerHref = cevrilmisYol(cevrilmisSayfa("cozumler"), lang);
  const base = lang === "tr" ? "/cozumler" : "/en/solutions";

  // Şerit artık tüm sektörleri değil, aynı konu ailesini gösteriyor —
  // gerekçesi `ilgiliRefler`in başında. Eşleşme derleme zamanı garanti.
  const related = ilgiliRefler(solution.key).map((r) => solutionByKey(r.key)!);
  const url = `${SITE}${base}/${slugOf(solution, lang)}`;

  const caseProject = caseRefProject(c);

  // Sayfada fiyat bandı yazıyorsa aynı rakamı yapılandırılmış veriye de koyarız.
  // Ayrıştırma `lib/pricing.ts`te: burada elle yazılmışken İngilizce virgüllü
  // bandı ("₺250,000 – 400,000") virgülde kesip 250 okuyordu.
  const lowPrice = ilkFiyat(c.pricing?.tiers[0]?.price);

  // Bölüm başlığı varsa fayda kartları onun altına iner; yoksa kartlar bölümün kendisidir.
  const CardHeading = c.benefitsTitle ? "h3" : "h2";

  // Ara halka 2 Eylül'de eklendi: hub açılana kadar 42 sayfanın kırıntısı
  // doğrudan ana sayfaya bağlanıyordu, yani hiyerarşide bir kat eksikti.
  // Ebeveynlik sitemap'te değil, kırıntıda ve bağlantıda okunuyor.
  const crumbs = [
    { label: L.home, href: homeHref },
    {
      label: hubIcerigi[lang].eyebrow,
      href: cevrilmisYol(cevrilmisSayfa("cozumler"), lang),
    },
    { label: c.h1 },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        dateModified: SOLUTIONS_LASTMOD,
        name: c.h1,
        // Kısa hâl, bilerek. Bir ara buraya kısa cevabın tamamı konmuştu:
        // "makinenin okuduğu, insanın okuduğuyla aynı olsun" diye. Ölçünce
        // bunun bedeli çıktı — aynı 1,2 KB pasaj sayfada DÖRT kez duruyordu:
        // görünür paragraf, bu alan ve RSC yükünün iki kopyası. 79 sayfada
        // ~7,4 KB ham / ~2 KB gzip fazladan.
        //
        // Kazanç sıfırdı: pasaj zaten sayfanın ilk %5'inde, görünür metin
        // olarak duruyor. Tarayıcı da, yapay zekâ da onu okuyor. Aynı dizeyi
        // yapısal veriye ikinci kez yazmak yeni bir şey söylemiyor.
        description: c.metaDescription,
        url,
        serviceType: c.h1,
        areaServed: lang === "tr" ? "TR" : ["TR", "Worldwide"],
        inLanguage: lang,
        provider: { "@id": `${SITE}/#organization` },
        offers: lowPrice
          ? {
              "@type": "AggregateOffer",
              url: `${url}${contactHref}`,
              availability: "https://schema.org/InStock",
              priceCurrency: "TRY",
              lowPrice,
            }
          : {
              "@type": "Offer",
              url: `${url}${contactHref}`,
              availability: "https://schema.org/InStock",
            },
      },
      faqLd(c.faq),
      breadcrumbLd(crumbs, SITE, url),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 pt-32 sm:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-x relative z-10">
          <Breadcrumb items={crumbs} />

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div>
                <span className="eyebrow">{c.eyebrow}</span>
                <h1 className="h-section mt-5 text-balance">{c.h1}</h1>
                <p className="lead mt-6 max-w-xl">{c.intro}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a href={contactHref} className="btn btn-primary">
                      {c.ctaButton}
                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                  <Link
                    href={tumHizmetlerHref}
                    className="pill-link pill-link-lg"
                  >
                    {L.seeAll}
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[440px]">
                <div className="absolute inset-[8%] rounded-[40px] bg-gradient-to-br from-cyan/20 to-blue/10 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-card)] ring-1 ring-white/40">
                  {/* `priority` ŞART: bu görsel LCP elemanı. Ölçüldü (PSI mobil,
                      sektör sayfası) — `priority` yokken next/image
                      `loading="lazy"` basıyor ve tarayıcı görseli ancak
                      düzen hesaplandıktan sonra keşfediyor: 1.371 ms KEŞİF
                      gecikmesi, LCP 3,6 sn. Vaka sayfaları (`CaseArticle`)
                      bunu zaten doğru yapıyordu; 17 TR + 17 EN sektör
                      sayfası atlanmıştı ve onlar sitenin en değerli
                      sayfaları. */}
                  <Image
                    src={solution.image}
                    alt={c.h1}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sayfanın ilk ekranından hemen sonra, her şeyden önce: konum tesadüf
          değil, gerekçesi bileşenin kendisinde yazılı. */}
      <KisaCevap icerik={c.shortAnswer} />

      {/* ── Problem ──────────────────────────────────────── */}
      {c.problem && (
        <section className="section relative overflow-hidden !pb-0">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-balance">{c.problem.title}</h2>
              </Reveal>
              {/* Paragraflar tek Reveal içinde: her birine ayrı IntersectionObserver
                  açmanın görsel karşılığı yok, stagger sadece kartlarda anlamlı. */}
              <Reveal>
                <div className="mt-8 flex flex-col gap-5">
                  {c.problem.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-[1.03rem] leading-relaxed text-ink-2"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          {c.benefitsTitle && (
            <Reveal>
              <h2 className="h-section mb-12 text-center text-balance">
                {c.benefitsTitle}
              </h2>
            </Reveal>
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="h-full">
                <article className="glass-card border-gradient flex h-full flex-col rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] sm:p-7">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green via-cyan to-blue text-white shadow-[var(--shadow-glow)]">
                    <Check className="h-5 w-5" strokeWidth={2.6} />
                  </span>
                  <CardHeading className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold tracking-tight text-ink">
                    {b.title}
                  </CardHeading>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {b.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50">
        <Aurora className="opacity-40" />
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-center">{c.featuresTitle}</h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {c.features.map((f, i) => (
                <Reveal
                  key={f}
                  delay={i * 0.05}
                  as="li"
                  className="flex items-start gap-3 soft-card p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10">
                    <Check
                      className="h-3.5 w-3.5 text-green-deep"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-[0.95rem] font-medium text-ink">
                    {f}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Fiyat bandı ──────────────────────────────────── */}
      {c.pricing && (
        <section className="section relative overflow-hidden">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">
                  {c.pricing.title}
                </h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">
                  {c.pricing.lead}
                </p>
              </Reveal>

              <div className="mt-12 flex flex-col gap-4">
                {c.pricing.tiers.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.07}>
                    <article className="glass-card border-gradient rounded-[var(--r-lg)] p-6 shadow-[var(--shadow-card)] sm:p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-ink">
                          {t.name}
                        </h3>
                        <div className="flex items-baseline gap-3">
                          <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-extrabold tracking-tight text-ink">
                            {t.price}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
                            {t.timeline}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                        {t.body}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="mt-7 text-center text-[0.9rem] leading-relaxed text-ink-3">
                  {c.pricing.note}
                </p>
                {c.pricing.link && (
                  <p className="mt-5 text-center">
                    <Link href={c.pricing.link.href} className="pill-link">
                      {c.pricing.link.label}
                    </Link>
                  </p>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Gerçek referans ──────────────────────────────── */}
      {c.caseRef && caseProject && (
        <section className="section relative overflow-hidden bg-bg-2/50">
          <div className="container-x relative z-10">
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
              <Reveal>
                <a
                  href={caseProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-[var(--r-lg)] shadow-[var(--shadow-card)] ring-1 ring-white/40"
                >
                  <Image
                    src={shotAt(caseProject.shot, 1120)}
                    alt={`${caseProject.name} web sitesi`}
                    width={1120}
                    height={700}
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </a>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <span className="eyebrow">{caseProject.name}</span>
                  <h2 className="h-section mt-5 text-balance">
                    {c.caseRef.title}
                  </h2>
                  <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-2">
                    {c.caseRef.body}
                  </p>
                  <Link
                    href={`${homeHref}#work`}
                    className="mt-7 pill-link pill-link-lg"
                  >
                    {c.caseRef.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Süreç ────────────────────────────────────────── */}
      {c.process && (
        <section className="section relative overflow-hidden">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">
                  {c.process.title}
                </h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">
                  {c.process.lead}
                </p>
              </Reveal>

              {/* Numaralandırma burada bilgi taşıyor: adımlar gerçekten sıralı. */}
              <ol className="mt-12 flex flex-col gap-3">
                {c.process.steps.map((s, i) => (
                  <Reveal
                    key={s.name}
                    delay={i * 0.06}
                    as="li"
                    className="flex gap-5 soft-card p-5 sm:p-6"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green via-cyan to-blue font-[family-name:var(--font-mono)] text-[0.85rem] font-bold text-white shadow-[var(--shadow-glow)]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight text-ink">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
                        {s.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ── Nelere dikkat etmeli ─────────────────────────── */}
      {c.checklist && (
        <section className="section relative overflow-hidden bg-bg-2/50">
          <div className="container-x relative z-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="h-section text-center text-balance">
                  {c.checklist.title}
                </h2>
                <p className="lead mx-auto mt-5 max-w-2xl text-center">
                  {c.checklist.lead}
                </p>
              </Reveal>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {c.checklist.items.map((it, i) => (
                  <Reveal key={it.title} delay={i * 0.05} className="h-full">
                    <article className="flex h-full flex-col soft-card p-5">
                      <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight text-ink">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-2">
                        {it.body}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ (native <details>, works without JS) ─────── */}
      <section className="section relative overflow-hidden">
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="h-section text-center">{c.faqTitle}</h2>
            </Reveal>
            <div className="mt-12 flex flex-col gap-3">
              {c.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="group soft-card p-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-display)] text-[1.02rem] font-semibold text-ink">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kanıt, istekten önce: formun hemen üstünde bu alanda yaptığımız
          işler. Hangi dilde vaka olduğu kararı `casesForSolution`da. */}
      <YapilanIsler
        sektorAnahtari={solution.key}
        sektorEtiketi={sektorEtiketi}
        lang={lang}
      />

      {/* Blog'a köprü: bu sayfalar sitenin en çok bağlanan sayfaları, blog
          yazıları ise en az bağlananıydı (her birine tek bağlantı). */}
      <IlgiliYazilar sektorAnahtari={solution.key} lang={lang} />

      {/* Genel "konuşalım" bandı yerine sektöre özel brief formu. Bant,
          ziyaretçiyi ana sayfadaki boş metin kutusuna gönderiyordu; arama
          sonucundan gelen meşgul bir profesyonel orada yazmaya oturmuyor. */}
      <SektorBrief
        sektorAnahtari={solution.key}
        sektorEtiketi={sektorEtiketi}
        secenekler={c.features}
      />

      {/* ── Related solutions (internal links) ───────────── */}
      <section className="section relative overflow-hidden bg-bg-2/50 !pt-0">
        <div className="container-x relative z-10">
          <Reveal>
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="font-[family-name:var(--font-display)] text-[1.5rem] font-bold tracking-tight text-ink sm:text-[1.9rem]">
                {L.more}
              </h2>
              <p className="lead mt-3">{L.moreLead}</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-2.5">
            {related.map((s) => (
              <Link
                key={s.key}
                href={`${base}/${slugOf(s, lang)}`}
                className="pill-link"
              >
                {contentOf(s, lang).h1}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
            {/* Şerit artık kısaltılmış bir seçki; tam liste bir tık uzakta
                dursun ki "benimki listede yok mu" diye çıkan olmasın. */}
            <Link href={tumHizmetlerHref} className="pill-link">
              {L.seeAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
