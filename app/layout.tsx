import type { Metadata, Viewport } from "next";
import { Montserrat, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import SmoothScroll from "@/components/fx/SmoothScroll";
import KaynakIzi from "@/components/fx/KaynakIzi";
import Preloader from "@/components/fx/Preloader";
import Grain from "@/components/fx/Grain";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";
import { CALISMA, EPOSTA, SEHIR, sameAs, TANIM } from "@/lib/marka";

/*
 * YAZI TİPLERİ — kaç ağırlık preload edildiği LCP'yi doğrudan belirliyor.
 *
 * ÖLÇÜLDÜ (PSI mobil): üç sayfa tipinde de LCP elemanı bir METİN ve hepsinde
 * ~2,3 sn "element render delay" var — ana sayfa 2350 ms, blog 2309 ms.
 * Sebep `display: swap` zinciri: metin önce yedek fontla boyanıyor, gerçek
 * font gelince YENİDEN boyanıyor ve Chrome LCP'yi o ikinci boyamaya
 * kaydırıyor. Yani LCP, fontun inme süresine bağlı.
 *
 * Önce 12 ağırlık vardı; head'e 6 dosya / 179 KB preload giriyordu. Slow 4G'de
 * bu tek başına saniyeler demek. Sayım yapıldı, kullanılmayanlar atıldı.
 */
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  // 500 ATILDI: display fontuyla birlikte hiçbir yerde `font-medium`
  // kullanılmıyor (sayıldı: 0). globals.css'teki tek `font-weight: 500`
  // gövde fontunu kullanan bir pill bileşenine ait.
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  /*
   * `optional`, `swap` DEĞİL — ve yalnızca gövde fontunda.
   *
   * NEDEN BURADA: ölçülen üç sayfa tipinin de metin LCP elemanı gövde
   * fontunu kullanıyor. Ana sayfada `<p class="lead">`, blogda sınıfsız bir
   * paragraf; ikisi de font-family belirtmiyor, `body`den miras alıyor.
   *
   * `swap` NE YAPIYORDU: metin önce yedek fontla boyanıyor, Manrope gelince
   * YENİDEN boyanıyor. Chrome ikinci boyamayı yeni bir LCP adayı sayıyor,
   * yani LCP fontun inme süresine bağlanıyordu — ölçüm: 2350 ms (ana sayfa),
   * 2309 ms (blog) "element render delay".
   *
   * `optional` NE YAPIYOR: tarayıcı fonta ~100 ms tanıyor. Yetişirse gerçek
   * fontla boyanıyor; yetişmezse O SAYFA YÜKLEMESİ boyunca yedekte kalıyor
   * ve ikinci boyama HİÇ olmuyor. LCP ilk boyamada kapanıyor. Font arka
   * planda inip önbelleğe giriyor, sonraki her sayfada gerçek font.
   *
   * KAYIP NEDİR: yavaş bağlantıdaki ilk ziyarette gövde metni yedek fontla
   * görünüyor. Ama `swap`te de zaten 2,3 saniye boyunca yedek font
   * görünüyordu — fark, metnin okuma sırasında yerinden zıplamaması.
   * Düzen kaymıyor: next/font metrik uyumlu yedek üretiyor, ölçülen CLS 0.
   *
   * BAŞLIKLAR ETKİLENMİYOR: Montserrat `swap`te kaldı. Markanın sesi olan
   * tipografi gecikmeli de olsa geliyor; LCP'yi belirleyen o değil.
   */
  display: "optional",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  // 400 ATILDI: mono ile `font-normal` hiçbir yerde kullanılmıyor (sayıldı: 0).
  weight: ["500", "600"],
  variable: "--font-mono-jb",
  display: "swap",
  // PRELOAD KAPALI, bilerek. Mono yalnızca küçük etiketlerde geçiyor —
  // eyebrow'lar, breadcrumb, footer sütun başlıkları. Hiçbir sayfada LCP
  // elemanı DEĞİL. Preload edildiğinde ilk boyamanın kritik bandını, LCP'yi
  // belirleyen display ve gövde fontlarıyla paylaşıyordu. Artık CSS
  // üzerinden normal öncelikle iniyor; küçük etiketler bir an yedek fontla
  // görünüp yerine oturuyor, düzen kaymıyor (next/font metrik uyumlu yedek
  // üretiyor, ölçülen CLS 0).
  preload: false,
});

const OG_DESC =
  "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Aranan ifade önce, marka sonra. Adımızı bilmeyen kimse "Forpus" aramıyor;
    // ana sayfanın hizmet aramalarında da yarışması için başlık böyle kuruldu.
    // Şehir bilerek yok: aşağıdaki açıklama ve `Organization` şemasındaki
    // `PostalAddress` zaten söylüyor, sekmede tekrarı başlığı uzatıyordu.
    default: "Web Tasarım ve Mobil Uygulama Ajansı | Forpus Yazılım",
    template: "%s | Forpus Yazılım",
  },
  // 155 karakterin altında: Google bu uzunlukta kesmeden gösteriyor.
  description:
    "İstanbul merkezli yazılım şirketi. Kurumsal web sitesi, e-ticaret ve mobil uygulama geliştiriyoruz. ₺50.000'den başlayan paketler, ücretsiz teklif.",
  applicationName: "Forpus Yazılım",
  // `keywords` YOK, bilerek. Google 2009'dan beri yok sayıyor, Bing sıralamada
  // kullanmıyor. Burada 21 satırlık bir dizi duruyordu ve tek yaptığı, şehir
  // ve hizmet adlarının site genelindeki konumlandırmayla senkron tutulması
  // gereken altıncı bir yer olmaktı — hiçbir karşılığı olmadan.
  authors: [{ name: "Forpus Yazılım", url: SITE_URL }],
  creator: "Forpus Yazılım",
  publisher: "Forpus Yazılım",
  category: "technology",
  alternates: {
    canonical: "/",
    // İngilizce ana sayfa /en'de; x-default Türkiye odağı nedeniyle TR.
    languages: { "tr-TR": "/", "en-US": "/en", "x-default": "/" },
  },
  icons: {
    icon: [
      { url: "/brand/forpus-logo.png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Forpus Yazılım",
    title: "Forpus Yazılım — Dijital Ürün Stüdyosu",
    description: OG_DESC,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Forpus Yazılım — Web, Mobil, Reklam & Tasarım",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forpus Yazılım — Dijital Ürün Stüdyosu",
    description: OG_DESC,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // TEK VARLIK, İKİ TÜR. Ayrı bir `#service` düğümü vardı ve `name`,
      // `url`, `image`, `email`, `areaServed` alanlarını buradan harfi
      // harfine kopyalıyordu — üstelik `parentOrganization` ile kendini
      // kendi ebeveyni ilan ediyordu. `sameAs` yalnız birine eklenince de
      // aynı şirket, biri profilli biri profilsiz, iki varlık gibi
      // görünüyordu. Birleştirildi.
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Forpus Yazılım",
      url: SITE_URL,
      sameAs,
      logo: `${SITE_URL}/brand/forpus-logo.png`,
      image: `${SITE_URL}/og.png`,
      email: EPOSTA,
      // Adın kısa ve İngilizce biçimleri. "forpus" sorgusunda 16. sıradayız
      // ama bu bir marka hatası DEĞİL: Forpus aynı zamanda bir papağan cinsi
      // (Wikipedia'da dokuz tür sayfası) ve Letonya'da bir kırtasiye markası.
      // 90 günde 3 gösterim aldı — kovalanacak bir sorgu değil. Bu alan o
      // yüzden değil, varlığın adının tek biçimine bağlı kalmaması için var.
      alternateName: ["Forpus", "Forpus Software"],
      // Burada dokuz kelimelik bir cümle duruyordu ve bir varlığın makineye
      // anlattığı şeyin TAMAMI oydu. Artık ana sayfada ekranda yazan paragrafın
      // aynısı: gerekçe `lib/marka.ts`te, TANIM'ın üstünde.
      description: TANIM.ozet,
      /*
       * KONUM. Sitenin her sayfasında, TEK düğümde.
       *
       * Önce yalnız iletişim sayfasında duruyordu ve aynı `@id`ye ikinci bir
       * düğüm yazıyordu: aynı sayfada `areaServed` hem "TR" hem şehir listesi
       * oluyordu. Bir varlığın yer beyanı sayfadan sayfaya değişemez — bu
       * yüzden tarif buraya, kimliğin durduğu yere alındı.
       *
       * `address` yalnız il ve ülke. Sokak adresi ve telefon bilerek yok:
       * gerekçesi `lib/marka.ts`te.
       */
      address: {
        "@type": "PostalAddress",
        addressLocality: SEHIR.en,
        addressRegion: SEHIR.en,
        addressCountry: "TR",
      },
      areaServed: [
        { "@type": "Country", name: "Türkiye" },
        { "@type": "City", name: SEHIR.en },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: CALISMA.gunler,
        opens: CALISMA.acilis,
        closes: CALISMA.kapanis,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: EPOSTA,
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
      },
      knowsLanguage: ["tr", "en"],
      priceRange: "₺₺",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hizmetler",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Yazılım & Geliştirme",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobil Uygulama Geliştirme",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Reklam & Performans (Meta, Google)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sosyal Medya & Tasarım" },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Forpus Yazılım",
      inLanguage: "tr",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f2f8f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/*
          Boyama ÖNCESİ çalışan iki küçük iş:

          1. html.lang'i adrese göre düzelt. Statik export'ta <html> yalnızca kök
             layout'ta üretiliyor, yani route'a göre değiştirilemiyor — sunucudan
             gelen HTML her sayfada "tr" diyor. /en altındaki sayfalar İngilizce
             olduğu için burada düzeltiyoruz; ekran okuyucular ve DOM'u okuyan her
             şey doğru değeri görüyor. (Google dili içerikten ve hreflang'den
             belirliyor, lang özniteliğinden değil.)

          2. Açılış perdesi oturumda bir kez görünsün. Bu da boyamadan önce
             olmalı, yoksa perde bir an parlayıp kaybolur.

          Depolama kapalıysa (gizli sekme vb.) sessizce eski davranışa düşer.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0){document.documentElement.lang='en'}` +
              `try{if(sessionStorage.getItem('forpus:acilis')){document.documentElement.setAttribute('data-acilis-goruldu','1')}else{sessionStorage.setItem('forpus:acilis','1')}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${manrope.variable} ${jetbrains.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <KaynakIzi />
          <Preloader />
          <SmoothScroll />
          <Grain />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
