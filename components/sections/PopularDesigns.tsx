import { signatureDesigns } from "@/config/copy";
import Image from "next/image";
import { Home, Bed, Bath, Car } from "lucide-react";

// Helper function to render specs with icons
const renderSpecsWithIcons = (specs: string) => {
  const parts = specs.split(' • ');
  return parts.map((part, index) => {
    let icon;
    let text = part;
    
    if (part.includes('lantai')) {
      icon = <Home className="w-4 h-4" />;
      text = part.replace('🏠 ', '');
    } else if (part.includes('kamar tidur')) {
      icon = <Bed className="w-4 h-4" />;
      text = part.replace('🛏️ ', '');
    } else if (part.includes('kamar mandi')) {
      icon = <Bath className="w-4 h-4" />;
      text = part.replace('🚿 ', '');
    } else if (part.includes('Carport')) {
      icon = <Car className="w-4 h-4" />;
      text = part.replace('🚗 ', '');
    }
    
    return (
      <span key={index} className="flex items-center gap-2">
        {icon && (
          <span className="w-8 h-8 rounded-full bg-[#0d3451] flex items-center justify-center text-white">
            {icon}
          </span>
        )}
        <span>{text}</span>
      </span>
    );
  });
};

export function PopularDesigns() {
  return (
    <section id="popular-designs" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0d3451]">
      <div className="max-w-7xl mx-auto">
        {/* Signature Designs Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Pilihan Desain Populer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureDesigns.map((design, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 cursor-pointer group"
              >
                {/* Design Image */}
                <div className={`${design.bgColor} h-64 flex items-center justify-center p-4 transition-all duration-300`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={[`/Fasad/1.webp`, `/Fasad/2.webp`, `/Fasad/3.webp`][idx % 3]}
                      alt={design.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#0d3451]">
                    {design.name}
                  </h3>
                  <div className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                    <div className="flex flex-wrap gap-3">
                      {renderSpecsWithIcons(design.specs)}
                    </div>
                  </div>
                  <p className="text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                    {design.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
