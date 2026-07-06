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
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
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
      <CTA />
      <Contact />
    </>
  );
}
