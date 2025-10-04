import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollButton } from "@/components/ScrollButton";
import { heroCopy } from "@/config/copy";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          {heroCopy.headline}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          {heroCopy.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ScrollButton targetId="popular-designs">
            {heroCopy.secondary_cta}
          </ScrollButton>
        </div>
      </div>
    </section>
  );
}
