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

export default function Page() {
  return (
    <>
      {/*
        Hero görseli masaüstünde LCP elemanı (ölçüldü). next/image'ın `priority`
        prop'u statik export + `images.unoptimized` modunda fetchpriority ya da
        preload üretmiyor, bu yüzden elle veriyoruz. React 19 bu etiketi <head>'e
        taşır. Kök layout'a değil buraya konuldu: preload indirmeyi zorlar, iç
        sayfalarda bu görsel kullanılmadığı için orada boşa trafik olurdu.
      */}
      <link
        rel="preload"
        as="image"
        href="/generated/hero-device.webp"
        type="image/webp"
        fetchPriority="high"
      />
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
