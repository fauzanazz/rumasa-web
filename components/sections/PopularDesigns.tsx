import { signatureDesigns } from "@/config/copy";
import Image from "next/image";


export function PopularDesigns() {
  return (
    <section id="popular-designs" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Signature Designs Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
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
                      src={[`/Fasad/1.png`, `/Fasad/2.png`, `/Fasad/3.png`][idx % 3]}
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    {design.name}
                  </h3>
                  <p className="text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                    {design.specs}
                  </p>
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
