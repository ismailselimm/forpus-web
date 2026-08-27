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

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-jb",
  display: "swap",
});

const OG_DESC =
  "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Aranan ifade önce, marka sonra. Adımızı bilmeyen kimse "Forpus" aramıyor;
    // ana sayfanın hizmet aramalarında da yarışması için başlık böyle kuruldu.
    // Şehir başlıkta: 90 günde coğrafi niyetli TEK bir sorgu gösterim
    // almadı ve alması da beklenemezdi — "İstanbul" ana sayfanın başlığında,
    // açıklamasında ve gövdesinde hiç geçmiyordu. Sayfada olmayan bir
    // kelimeyle eşleşme olmaz.
    default: "İstanbul Web Tasarım ve Mobil Uygulama | Forpus Yazılım",
    template: "%s | Forpus Yazılım",
  },
  // 155 karakterin altında: Google bu uzunlukta kesmeden gösteriyor.
  description:
    "İstanbul merkezli yazılım şirketi. Kurumsal web sitesi, e-ticaret ve mobil uygulama geliştiriyoruz. ₺50.000'den başlayan paketler, ücretsiz teklif.",
  applicationName: "Forpus Yazılım",
  keywords: [
    "Forpus",
    "Forpus Yazılım",
    "İstanbul yazılım şirketi",
    "İstanbul web tasarım",
    "yazılım stüdyosu",
    "dijital ajans",
    "web yazılım",
    "web tasarım",
    "kurumsal web sitesi",
    "e-ticaret",
    "mobil uygulama",
    "uygulama geliştirme",
    "iOS Android uygulama",
    "Flutter",
    "Next.js",
    "Meta reklam",
    "Google Ads",
    "performans pazarlama",
    "sosyal medya yönetimi",
    "UI/UX tasarım",
    "SEO",
  ],
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
      description: TANIM.govde.tr,
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
