"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  isBilingualRoute,
  hrefForLang,
  homeFor,
  isHome,
  routeLang,
} from "@/lib/routes";
import Logo from "@/components/ui/Logo";
import Magnetic from "@/components/fx/Magnetic";
import { useLang } from "@/components/providers/LanguageProvider";

/** Dil değiştiricinin tek kaynağı: hem rozetler hem erişilebilir ad. */
const DILLER = ["tr", "en"] as const;

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Section anchors only exist on the homepage. Off-home (e.g. solution pages)
  // prefix with "/" so the link navigates home first, then scrolls to the section.
  const pathname = usePathname();
  const onHome = isHome(pathname);
  const bilingual = isBilingualRoute(pathname);
  // Bu adreste hangi dildeyiz? Bölüm çıpaları ve logo o dilin ana sayfasına
  // çözülmeli — /en'deyken "/#services" demek, sayfada zaten duran bir bölüme
  // gitmek için Türkçe ana sayfaya atlamak demekti.
  const home = homeFor(routeLang(pathname) ?? lang);
  const otherLangHref = hrefForLang(pathname, lang === "tr" ? "en" : "tr");

  // Rozetler ve kabuk sınıfı, link ve buton dallarında birebir aynıydı.
  const langSwitchCls =
    "flex h-9 items-center gap-1 rounded-full border border-line bg-white/60 px-1 text-xs font-semibold";
  /**
   * "TR EN" rozetleri ve denetimin erişilebilir adı.
   *
   * SORUN: ad "English" iken ekranda "TR EN" yazıyordu. WCAG 2.5.3 (Label in
   * Name) bunu yasaklıyor ve kuralın asıl mağduru SESLE KOMUT VEREN kullanıcı:
   * ekranda gördüğünü söylüyor ("TR EN'e bas"), tarayıcı o adda bir denetim
   * bulamıyor ve hiçbir şey olmuyor.
   *
   * Denenip terk edilen yol: rozetleri `aria-hidden` yapmak. Lighthouse'a
   * canlıda tekrar sordurunca denetim hâlâ düşüyordu — axe "görünür metin"i
   * hesaplarken `aria-hidden`a bakmıyor, ekranda duran metni okuyor. Üstelik
   * o yol, hangi dilin etkin olduğu bilgisini ekran okuyucudan gizliyordu.
   *
   * ÇÖZÜM: ad, ekranda yazanı KAPSIYOR — "TR EN — English". Rozetlerin arasına
   * gerçek bir boşluk düğümü konuyor; `gap-1` yalnızca görsel aralık veriyor,
   * metin düğümü üretmiyordu ve iki rozet "TREN" diye tek kelimeye yapışıyordu.
   *
   * Hedef dil kendi dilinde yazılı ("English" / "Türkçe") — çünkü onu arayan
   * kişi o dili arıyor, Türkçe okuyamıyor olabilir.
   */
  // Ad ile rozetler AYNI diziden türüyor. Elle yazılmış "TR EN" ile
  // `.map` iki ayrı kaynaktı; diziye üçüncü dil eklendiği ya da sıra
  // değiştiği gün ad ekrandakini kapsamayı bırakır ve düzeltilen WCAG
  // 2.5.3 hatası derleyici hiçbir şey demeden geri gelirdi.
  const langLabel = `${DILLER.map((l) => l.toUpperCase()).join(" ")} — ${t.langToggle.switchTo}`;
  const langBadges = DILLER.map((l, i) => (
    // `Fragment` DOM'a düğüm eklemiyor: rozetler flex kabuğunun DOĞRUDAN
    // çocuğu kalıyor. Aradaki boşluk düğümü CSS'te hiçbir şey yapmıyor —
    // flex, yalnızca boşluktan oluşan metni öğe saymaz — ama metin
    // çıkarımında "TREN"i "TR EN" yapıyor. Görünüm değişmiyor, ad eşleşiyor.
    <Fragment key={l}>
      {i > 0 && " "}
      <span
        className={clsx(
          "rounded-full px-2 py-1 transition-all",
          lang === l ? "bg-ink text-white" : "text-ink-3",
        )}
      >
        {l.toUpperCase()}
      </span>
    </Fragment>
  ));
  // "#services" gibi bölüm bağlantıları ana sayfa dışındayken "/#services" olmalı.
  // "/blog", "/isler" gibi gerçek yollar olduğu gibi kalır.
  const to = (href: string) =>
    href.startsWith("/")
      ? href
      : onHome
        ? href
        : `${home === "/" ? "" : home}${href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#personas", label: t.nav.personas },
    // Blog ve vakalar yalnızca Türkçe; İngilizce ziyaretçiye var gibi gösterip
    // Türkçe sayfaya düşürmek yerine gizliyoruz.
    ...(lang === "tr"
      ? [
          { href: "/isler", label: t.nav.work },
          { href: "/blog", label: t.nav.blog },
        ]
      : []),
    { href: "#packages", label: t.nav.packages },
    { href: "#process", label: t.nav.process },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container-x">
          <div
            className={clsx(
              "flex items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass h-[58px] shadow-[var(--shadow-soft)]"
                : "h-[60px] border border-transparent",
            )}
          >
            <a
              href={onHome ? "#top" : home}
              className="flex items-center"
              aria-label="Forpus"
            >
              <Logo variant="full" className="h-7 w-auto sm:h-8" priority />
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((l) => {
                // Gerçek yollar next/link ile: düz <a> tam sayfa yeniden yükleme
                // yapıyor ve açılış perdesi tekrar çalışıyordu.
                const cls =
                  "rounded-full px-3.5 py-2 text-[0.93rem] font-medium text-ink-2 transition-colors hover:text-ink";
                return l.href.startsWith("/") ? (
                  <Link key={l.href} href={l.href} className={cls}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={to(l.href)} className={cls}>
                    {l.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Tek dilli sayfalarda (blog, vakalar) toggle gizli: aksi halde
                  menü İngilizce, gövde Türkçe kalan melez bir sayfa oluyordu. */}
              {bilingual &&
                // Karşı dilin ayrı bir adresi varsa gerçek bağlantı ver: hem
                // tarayıcı hem Google iki sürümü bağlantılı görür. Yoksa (ana
                // sayfa) dil istemci tarafında değişir.
                (otherLangHref ? (
                  <Link
                    href={otherLangHref}
                    aria-label={langLabel}
                    className={langSwitchCls}
                  >
                    {langBadges}
                  </Link>
                ) : (
                  <button
                    onClick={toggle}
                    aria-label={langLabel}
                    className={langSwitchCls}
                  >
                    {langBadges}
                  </button>
                ))}

              <Magnetic className="hidden sm:block">
                <a
                  href={to("#contact")}
                  className="btn btn-primary h-10 px-5 text-sm"
                >
                  {t.nav.cta}
                </a>
              </Magnetic>

              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/60 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-ink" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex h-[76px] items-center justify-between">
              <div className="flex items-center">
                <Logo variant="full" className="h-7 w-auto" />
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5 text-ink" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={to(l.href)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <a
                href={to("#contact")}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
