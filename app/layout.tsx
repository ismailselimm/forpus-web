import type { Metadata, Viewport } from "next";
import { Montserrat, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Grain from "@/components/fx/Grain";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";

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
    default: "Web Sitesi ve Mobil Uygulama Ajansı | Forpus Yazılım",
    template: "%s | Forpus Yazılım",
  },
  // 155 karakterin altında: Google bu uzunlukta kesmeden gösteriyor.
  description:
    "Kurumsal web sitesi, e-ticaret ve mobil uygulama geliştiriyoruz. Gerçek referanslar, ₺50.000'den başlayan paketler. Ücretsiz teklif alın.",
  applicationName: "Forpus Yazılım",
  keywords: [
    "Forpus", "Forpus Yazılım", "yazılım stüdyosu", "dijital ajans", "web yazılım",
    "web tasarım", "kurumsal web sitesi", "e-ticaret", "mobil uygulama", "uygulama geliştirme",
    "iOS Android uygulama", "Flutter", "Next.js", "Meta reklam", "Google Ads",
    "performans pazarlama", "sosyal medya yönetimi", "UI/UX tasarım", "SEO",
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
      { url: "/og.png", width: 1200, height: 630, alt: "Forpus Yazılım — Web, Mobil, Reklam & Tasarım" },
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Forpus Yazılım",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/forpus-logo.png`,
      image: `${SITE_URL}/og.png`,
      email: "forpusyazilim@gmail.com",
      description:
        "Web, mobil uygulama, reklam ve tasarım sunan dijital ürün stüdyosu.",
      areaServed: "TR",
      knowsLanguage: ["tr", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Forpus Yazılım",
      inLanguage: "tr",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Forpus Yazılım",
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      email: "forpusyazilim@gmail.com",
      areaServed: "TR",
      priceRange: "₺₺",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hizmetler",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Yazılım & Geliştirme" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobil Uygulama Geliştirme" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reklam & Performans (Meta, Google)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sosyal Medya & Tasarım" } },
        ],
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f2f8f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${montserrat.variable} ${manrope.variable} ${jetbrains.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
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
