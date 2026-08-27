"use client";

import Link from "next/link";

import { CEVRILMIS_SAYFALAR, cevrilmisYol } from "@/lib/routes";
import { ArrowUp } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useLang } from "@/components/providers/LanguageProvider";
import { slugOfRef, ONE_CIKAN_SEKTORLER } from "@/lib/solution-index";
import { SosyalIkonlar } from "@/components/ui/SosyalIkonlar";

// Footer bağlantılarının ortak görünümü. Aynı 92 karakterlik sınıf dizisi
// dosyada 9 kez tekrar ediyordu; hover davranışını değiştirmek 9 dokunuştu.
const BAG =
  "inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink";

/**
 * Footer sütun başlıkları.
 *
 * `h2` — GÖRÜNÜŞÜNE RAĞMEN. Küçük, tek boşluklu, büyük harfli göründükleri
 * için `h4` yazılmıştı; ama başlık düzeyi bir yazı tipi boyu değil, belgedeki
 * derinlik. Lighthouse ölçtü: sayfanın son başlığı `h2` ya da `h3` iken
 * footer birden `h4`e atlıyordu, yani araya hiç var olmayan bir düzey
 * giriyordu (`heading-order`, 0 puan).
 *
 * Bunu okuyan yalnızca ekran okuyucu değil: bir sayfanın başlık ağacı,
 * hangi metnin hangi bölüme ait olduğunu makineye anlatan asıl iskelet.
 * Kırık bir iskelette footer'daki bağlantı listeleri, üstlerindeki içerik
 * bölümünün ALT BAŞLIĞI gibi görünüyordu.
 *
 * `h2` her yerde güvenli: atlama yalnızca aşağı inerken sayılır, `h1`den de
 * `h3`ten de sonra gelen bir `h2` düzey atlamaz. Boyut zaten sınıflarda.
 */
const SUTUN_BASLIK =
  "mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-3";

export default function Footer() {
  const { t, lang } = useLang();
  const solBase = lang === "tr" ? "/cozumler" : "/en/solutions";

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const yasalBaglantilar = [
    { href: "/gizlilik", label: t.footer.gizlilik },
    { href: "/kvkk", label: t.footer.kvkk },
    { href: "/kullanim-sartlari", label: t.footer.kullanimSartlari },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2/60">
      <div className="container-x relative z-10 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_0.9fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <Logo variant="full" className="h-9 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-[0.97rem] leading-relaxed text-ink-2">
              {t.footer.tagline}
            </p>
            <SosyalIkonlar
              eposta={t.contact.info.email}
              epostaEtiketi={t.contact.info.emailLabel}
              className="mt-6 flex gap-2.5"
              ikonClassName="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 text-ink-2 transition-all hover:-translate-y-0.5 hover:border-cyan hover:text-cyan-deep"
            />
          </div>

          {/* Solutions — SEO landing pages */}
          <div>
            <h2 className={SUTUN_BASLIK}>{t.footer.solutions}</h2>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              {ONE_CIKAN_SEKTORLER.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`${solBase}/${slugOfRef(s, lang)}`}
                    className={BAG}
                  >
                    {s.label[lang]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#personas"
                  className={`${BAG} font-medium text-ink-3`}
                >
                  {t.personas.sectors.title} →
                </a>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h2 className={SUTUN_BASLIK}>{t.footer.nav}</h2>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              <li>
                <a href="/#services" className={BAG}>
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="/isler" className={BAG}>
                  {t.nav.work}
                </a>
              </li>
              <li>
                <a href="/blog" className={BAG}>
                  {t.footer.blog}
                </a>
              </li>
              <li>
                <a href="/#process" className={BAG}>
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a href="/#team" className={BAG}>
                  {t.nav.team}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className={SUTUN_BASLIK}>{t.footer.services}</h2>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              {t.services.items.map((s) => (
                <li key={s.key}>
                  <a href="/#services" className={BAG}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className={SUTUN_BASLIK}>{t.footer.contact}</h2>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              <li>
                <a href={`mailto:${t.contact.info.email}`} className={BAG}>
                  {t.contact.info.email}
                </a>
              </li>
              <li>{t.contact.info.location}</li>
              {/* Sitenin her sayfasından iletişim sayfasına giden tek bağlantı.
                  Yeni bir sayfanın taranması ve sıralanması, siteden ona kaç
                  yerden gidildiğine bağlı; menüye eklemek yerine footer, çünkü
                  ana sayfada menüdeki "İletişim" formun kendisine kaymalı. */}
              <li>
                <Link
                  href={cevrilmisYol(CEVRILMIS_SAYFALAR[0], lang)}
                  className={BAG}
                >
                  {t.footer.iletisimSayfasi}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Forpus Yazılım. {t.footer.rights}
          </p>

          {/*
            Hukuki sayfalar. Alt şeritte duruyorlar çünkü aranan şey değiller;
            aranınca bulunabilir olmaları yeterli. Meta uygulaması da yayın için
            gizlilik politikası adresini burada arıyor.
          */}
          <nav
            aria-label={t.footer.yasal}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {yasalBaglantilar.map((y) => (
              <Link
                key={y.href}
                href={y.href}
                className="inline-block origin-center transition-transform duration-300 hover:scale-[1.06] hover:text-ink"
              >
                {y.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 font-medium text-ink-2 transition-all hover:-translate-y-0.5 hover:text-ink"
          >
            {t.footer.backToTop}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Oversized brand watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-[3vw] left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-[26vw] font-black leading-none tracking-tighter text-gradient opacity-[0.07]"
      >
        forpus
      </div>
    </footer>
  );
}
