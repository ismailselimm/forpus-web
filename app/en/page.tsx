import type { Metadata } from "next";
import HomeSections from "@/components/sections/HomeSections";
import { SITE_URL } from "@/lib/site";

/**
 * İngilizce ana sayfa.
 *
 * Daha önce /en 404 veriyordu: 17 İngilizce çözüm sayfası yayındaydı ama
 * girecekleri bir ana sayfa yoktu — küme yetimdi ve Google ana sayfanın
 * İngilizce karşılığını hiç görmüyordu.
 *
 * Bölümler ana sayfayla aynı; dil route'tan geliyor (lib/routes.ts), yani
 * bu adres sunucuda İngilizce olarak üretiliyor.
 */
export const metadata: Metadata = {
  // absolute: kök layout'un "%s | Forpus Yazılım" şablonunu atlar. Aksi halde
  // İngilizce sayfada "Forpus Software | Forpus Yazılım" gibi çift marka çıkıyor.
  title: { absolute: "Web & Mobile App Agency | Forpus Software" },
  description:
    "We build corporate websites, e-commerce and mobile apps. Real references, packages starting from ₺50,000. Get a free quote.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: { "tr-TR": SITE_URL, "en-US": `${SITE_URL}/en`, "x-default": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/en`,
    siteName: "Forpus Software",
    title: "Web & Mobile App Agency | Forpus Software",
    description: "Corporate websites, e-commerce and mobile apps — one team, end to end.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function EnglishHome() {
  return <HomeSections />;
}
