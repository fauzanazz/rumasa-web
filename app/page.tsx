import { Hero } from "@/components/sections/Hero";
import { PopularDesigns } from "@/components/sections/PopularDesigns";
import { HomeLayoutConfigurator } from "@/components/sections/HomeLayoutConfigurator";
import { WhyChooseRumasa } from "@/components/sections/WhyChooseRumasa";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeLayoutConfigurator />
      <PopularDesigns />
      <WhyChooseRumasa />
    </>
  );
}
