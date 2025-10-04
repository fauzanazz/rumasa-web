import { signatureDesigns } from "@/config/copy";


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
                {/* House Illustration */}
                <div className={`${design.bgColor} h-64 flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-110`}>
                  <div className="relative w-48 h-32 transition-transform duration-300 group-hover:scale-110">
                    {/* Simple house shape */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end">
                      {/* Roof */}
                      <div
                        className={`${design.roofColor} w-0 h-0 transition-all duration-300`}
                        style={{
                          borderLeft: '96px solid transparent',
                          borderRight: '96px solid transparent',
                          borderBottom: '48px solid currentColor',
                          marginBottom: '-2px'
                        }}
                      />
                      {/* House body */}
                      <div className={`${design.houseColor} w-48 h-20 relative transition-all duration-300`}>
                        {/* Windows */}
                        <div className="absolute top-4 left-8 w-8 h-6 bg-blue-500 transition-all duration-300 group-hover:bg-yellow-400"></div>
                        <div className="absolute top-4 right-8 w-8 h-6 bg-blue-500 transition-all duration-300 group-hover:bg-yellow-400"></div>
                        {/* Door */}
                        {idx === 0 && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-10 bg-blue-700 transition-all duration-300 group-hover:bg-blue-500"></div>
                        )}
                      </div>
                    </div>
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
