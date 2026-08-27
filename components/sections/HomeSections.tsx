import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import KisaTanim from "@/components/sections/KisaTanim";
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

/**
 * Ana sayfanın gövdesi — / ve /en aynı bölümleri kullanıyor.
 *
 * İki route'un ayrı dosya olması Next.js konvansiyonu (her biri kendi
 * metadata'sını veriyor), ama 13 bölümlük JSX'i iki kez yazmanın anlamı yok:
 * bir bölüm eklendiğinde birine eklenip diğerine unutulması kaçınılmazdı.
 * Dil route'tan geliyor (lib/routes.ts), bileşenin bilmesi gerekmiyor.
 */
export default function HomeSections() {
  return (
    <>
      {/* Hero görselinin preload'unu next/image üretiyor (Hero.tsx, priority +
          fetchPriority). Buraya elle eklemek mükerrer etiket demek. */}
      <span id="top" className="absolute top-0" aria-hidden="true" />
      <Hero />
      <Marquee />
      <KisaTanim />
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
