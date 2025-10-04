import { Hero } from "@/components/sections/Hero";
import { PopularDesigns } from "@/components/sections/PopularDesigns";
import { Configurator } from "@/components/sections/Configurator";
import { WhyChooseRumasa } from "@/components/sections/WhyChooseRumasa";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDesigns />
      <Configurator />
      <WhyChooseRumasa />
    </>
  );
}
