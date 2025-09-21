import Hero from "@/components/hero";
import HeroMobile from "@/components/hero mobile";
import SecondSection from "@/components/second-section";
import SecondSectionMobile from "@/components/second-section-mobile";
import Stack from "@/components/stack";
import BentoGrid from "@/components/bento-grid";
import Sites from "@/components/sites";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroMobile />
      <Hero />
       <Stack />
      <SecondSectionMobile />
      <SecondSection />
      <Sites />
      <FAQ/>
    </div>
  );
}
