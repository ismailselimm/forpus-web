import type { Metadata } from "next";
import { solutionUi } from "@/lib/solution-ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/fx/Reveal";
import PageHero from "@/components/ui/PageHero";
import SolutionChips from "@/components/ui/SolutionChips";
import { dictionary } from "@/lib/i18n/dictionary";
import { CEVRILMIS_SAYFALAR, cevrilmisYol, homeFor } from "@/lib/routes";
import { ONE_CIKAN_SEKTORLER } from "@/lib/solution-index";

/**
 * 404 SAYFASI.
 *
 * Statik export'ta bu sayfa `out/404.html` olarak üretiliyor ve GitHub Pages
 * bulunamayan her adres için onu sunuyor. Daha önce bu dosya YOKTU: ziyaretçi
 * Next.js'in fabrika çıkışı İngilizce ekranını görüyordu —
 * "404: This page could not be found."
 *
 * İKİ İŞ YAPIYOR:
 *
 * 1. SONDAKİ EĞİK ÇİZGİYİ DÜZELTİYOR. Site statik export; `/cozumler/x`
 *    çalışıyor ama `/cozumler/x/` 404 veriyor. Ölçüldü: `/iletisim/`,
 *    `/blog/`, bütün çözüm sayfaları. Reklam yönetim panelleri, sohbet
 *    uygulamaları ve elle kopyalanan bağlantılar adreslerin sonuna eğik
 *    çizgi eklemekte fazlasıyla cömert; reklam parasıyla gelen ziyaretçi
 *    hata sayfasına düşerse o tıklama çöp olur.
 *
 *    Çözüm `trailingSlash: true` DEĞİL: o, sitedeki bütün adresleri
 *    değiştirip indekste bulunan her sayfayı 301 zincirine sokardı. Buradaki
 *    düzeltme hiçbir çalışan adrese dokunmuyor, yalnızca zaten kırık olanı
 *    kurtarıyor. Sonsuz döngü yok — ikinci denemede sonda eğik çizgi kalmıyor.
 *
 * 2. ZİYARETÇİYİ KAYBETMİYOR. Adres gerçekten yoksa bile gelen kişi bir şey
 *    arıyordu; boş bir "bulunamadı" ekranı yerine sektör sayfalarına ve
 *    iletişime çıkan yollar veriyoruz.
 */

export const metadata: Metadata = {
  // Başlıksız bırakılınca kök layout'un ana sayfa başlığı düşüyordu:
  // sekmede ve paylaşımda ana sayfanın başlığı ("Web Tasarım ve Mobil
  // Uygulama Ajansı") yazıyordu.
  title: "Sayfa bulunamadı",
  // Next.js 404 için zaten noindex basıyor; burada tekrarlamak layout'tan
  // gelen "index, follow" ile çakışan ikinci etiketi tek doğruya indiriyor.
  robots: { index: false, follow: true },
};

/** İletişim adresi tek kaynaktan: `lib/routes.ts` bu çifti tabloda tutuyor. */
const ILETISIM = cevrilmisYol(CEVRILMIS_SAYFALAR[0], "tr");

const CIKIS_SINIFI = "text-ink-2 transition-colors hover:text-ink";

/** Ziyaretçiyi kaybetmemek için çıkış yolları. Etiketler sözlükten. */
const CIKISLAR = [
  { href: "/isler", etiket: "Yaptığımız işler" },
  { href: "/blog", etiket: dictionary.tr.footer.blog },
  { href: ILETISIM, etiket: dictionary.tr.nav.contact },
];

export default function NotFound() {
  return (
    <>
      <PageHero
        crumbs={[{ label: solutionUi.tr.home, href: homeFor("tr") }]}
        eyebrow="404"
        title="Bu sayfayı bulamadık."
        lead="Adres değişmiş, yazım hatası olmuş ya da sayfa kaldırılmış olabilir. Aradığınız şey büyük ihtimalle aşağıda."
      >
        <p className="mt-4 text-[0.92rem] text-ink-3">
          Page not found — the links below will get you where you were going.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={homeFor("tr")} className="btn btn-primary">
            {solutionUi.tr.home}
          </Link>
          <Link href={ILETISIM} className="pill-link pill-link-lg">
            Bize yazın
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="section !pt-4">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <SolutionChips
              keys={ONE_CIKAN_SEKTORLER.map((s) => s.key)}
              ikon={false}
              title="Belki bunlardan birini arıyordunuz"
              className="!mt-0"
            />

            <Reveal>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 text-[0.95rem]">
                {CIKISLAR.map(({ href, etiket }) => (
                  <Link key={href} href={href} className={CIKIS_SINIFI}>
                    {etiket} →
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
