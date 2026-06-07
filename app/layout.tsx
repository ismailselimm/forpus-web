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

export const metadata: Metadata = {
  metadataBase: new URL("https://forpus.com"),
  title: "Forpus Yazılım — Web, Mobil, Reklam & Tasarım",
  description:
    "Forpus, fikrinizi büyüyen dijital ürünlere dönüştüren bir yazılım stüdyosu. Web, mobil uygulama, Meta & Google reklamları, sosyal medya ve tasarım — tek çatı altında.",
  keywords: [
    "yazılım", "web tasarım", "mobil uygulama", "Meta reklam", "Google Ads",
    "sosyal medya", "Next.js", "Flutter", "Forpus",
  ],
  authors: [{ name: "Forpus Yazılım" }],
  icons: { icon: "/brand/forpus-logo.png", apple: "/brand/forpus-logo.png" },
  openGraph: {
    title: "Forpus Yazılım — Dijital Ürün Stüdyosu",
    description:
      "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.",
    type: "website",
    locale: "tr_TR",
  },
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
