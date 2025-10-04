import { getWhyChooseFromSheet } from "@/actions/sheets";
import { QuickContactForm } from "@/components/QuickContactForm";

const defaultReasons = [
  {
    id: "1",
    title: "Desain dan Pembangunan yang Cerdas & Terjamin",
    subtitle: "Dengan desain modular dari studio desain berpengalaman, waktu pembangunan jadi lebih cepat dan biaya tidak membengkak. Bergaransi selama masa pemeliharaan.",
    icon: "✏️",
  },
  {
    id: "2",
    title: "Denah Fleksibel sesuai Kebutuhan",
    subtitle: "Pilih desain sesuai kebutuhan dan rencana masa depan. Karena kebutuhan ruang setiap orang pasti berbeda-beda, bahkan di setiap fase-nya.",
    icon: "🏢",
  },
  {
    id: "3",
    title: "Personalisasi Finishing sesuai Selera",
    subtitle: "Dapat memilih style finishing yang bagus sesuai selera. Jika ingin lebih personal, dapat berkonsultasi dengan desainer interior Rumasa.",
    icon: "👥",
  },
];

export async function WhyChooseRumasa() {
  let reasons = defaultReasons;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Why Choose Rumasa */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Mengapa Beli Rumah di Rumasa ?
            </h2>

            <div className="space-y-8">
              {reasons.map((reason) => (
                <div key={reason.id} className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                      {reason.icon || "✓"}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {reason.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <QuickContactForm />
        </div>
      </div>
    </section>
  );
}
