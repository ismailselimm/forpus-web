import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Personas from "@/components/sections/Personas";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Mobile from "@/components/sections/Mobile";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Packages from "@/components/sections/Packages";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
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
  title: "Web & Mobile App Agency | Forpus Software",
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
  return (
    <>
      <link rel="preload" as="image" href="/generated/hero-device.webp" fetchPriority="high" />
      <span id="top" className="absolute top-0" aria-hidden="true" />
      <Hero />
      <Marquee />
      <Services />
      <Personas />
      <Process />
      <Work />
      <Mobile />
      <Stats />
      <Team />
      <Testimonials />
      <Packages />
      <CTA />
      <Contact />
    </>
  );
}
