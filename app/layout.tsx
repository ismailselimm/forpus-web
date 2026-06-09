import type { Metadata, Viewport } from "next";
import { Montserrat, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Grain from "@/components/fx/Grain";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

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

const SITE_URL = "https://forpusyazilim.com";
const OG_DESC =
  "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Forpus Yazılım — Web, Mobil, Reklam & Tasarım",
    template: "%s | Forpus Yazılım",
  },
  description:
    "Forpus, fikrinizi büyüyen dijital ürünlere dönüştüren bir yazılım stüdyosu. Web, mobil uygulama, Meta & Google reklamları, sosyal medya ve tasarım — tek çatı altında.",
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
  alternates: { canonical: "/" },
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
