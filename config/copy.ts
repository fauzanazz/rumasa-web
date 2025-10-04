import type { TypeItem, PopularDesigns } from "@/types";

export const heroCopy = {
  headline: "Beli rumah yang bisa pilih denah sesuai kebutuhan?",
  subheadline:
    "Kenyamanan ruang tinggal setiap orang berbeda. Rumasa menyediakan hingga 300 kombinasi denah agar ruang hidup Anda pas—sekarang dan nanti.",
  primary_cta: "Jadwalkan Konsultasi Sekarang",
  secondary_cta: "Lihat Desain Populer",
};

export const signatureDesigns = [
  {
    name: "Tipe Keluarga Kecil",
    specs: "2,5 lantai • 3 kamar tidur • 4 kamar mandi",
    description: "Desain minimalis dengan aksen gelap yang memberikan kesan elegan dan modern. Cocok untuk Anda yang menyukai nuansa sophisticated.",
    bgColor: "bg-amber-100",
    houseColor: "bg-amber-800",
    roofColor: "bg-red-600",
  },
  {
    name: "Tipe Keluarga Besar",
    specs: "3,5 lantai • 5 kamar tidur • 5 kamar mandi",
    description: "Desain modern dengan aksen gelap yang memberikan kesan elegan dan modern. Cocok untuk Anda yang menyukai nuansa sophisticated.",
    bgColor: "bg-blue-100",
    houseColor: "bg-slate-700",
    roofColor: "bg-slate-800",
  },
  {
    name: "Tipe Kos Eksklusif",
    specs: "3,5 lantai • 5 kamar tidur • 5 kamar mandi • Carport luas",
    description: "Desain modern dengan aksen gelap yang memberikan kesan elegan dan modern. Cocok untuk Anda yang menyukai nuansa sophisticated.",
    bgColor: "bg-emerald-100",
    houseColor: "bg-emerald-800",
    roofColor: "bg-emerald-900",
  },
];

export const popularDesigns: PopularDesigns = {
  ground_floor: [
    "Room Plus A",
    "Room Plus B",
    "Carport Plus A",
    "Carport Plus B",
    "Kitchen Plus",
  ],
  mid_floor_2: [
    "Room Plus",
    "Living Plus A",
    "Living Plus B",
    "Studio Apartment",
    "Studio Basic",
  ],
  top_floor: ["Room Plus", "Living Plus"],
  mid_floor_3_optional: [
    "Room Plus",
    "Living Plus A",
    "Living Plus B",
    "Studio Apartment",
    "Studio Basic",
  ],
};

export const configuratorLabels = {
  pilihan_lantai: ["2,5 Lantai", "3,5 Lantai*"],
  pilihan_style: ["Noir", "Light Concrete", "Terracota"],
  summary_title: "Kombinasi Desain Pilihan Anda",
  summary_fields: [
    "Jumlah lantai",
    "Ground Floor",
    "Mid Floor (Lantai 2)",
    "Mid Floor (Lantai 3)*",
    "Top Floor",
    "Style",
    "Luas Tanah (default 49 m²)",
    "Luas Bangunan (auto)",
  ],
};

export const estimatorCopy = {
  title: "Estimasi Biaya",
  note_lines: [
    "*Tidak termasuk pajak dan biaya notaris.",
    "Estimasi bersifat indikatif; detail akhir berdasarkan survei & spesifikasi pilihan.",
  ],
};

export const whyChooseStatic = [
  {
    title: "Desain & Pembangunan Cerdas—Terjamin",
    subtitle:
      "Modular dari studio berpengalaman: waktu lebih cepat, biaya terkendali, bergaransi selama masa pemeliharaan.",
  },
  {
    title: "Denah Fleksibel Sesuai Kebutuhan",
    subtitle:
      "Pilih desain yang mengikuti rencana masa depan Anda—karena kebutuhan ruang bisa berubah di setiap fase hidup.",
  },
  {
    title: "Personalisasi Finishing Sesuai Selera",
    subtitle:
      "Tentukan style favorit (Noir, Light Concrete, Terracota) atau konsultasikan dengan desainer interior Rumasa.",
  },
];

export const ctaCopy = {
  schedule: "Jadwalkan Konsultasi Sekarang",
  whatsapp_reason: "Tanya via WhatsApp",
  whatsapp_combo: "Konsultasi Kombinasi di WhatsApp",
};

export const footerCopy = {
  disclaimer:
    "Rumasa dapat menyesuaikan spesifikasi sesuai regulasi & ketersediaan material.",
  company: "© Rumasa",
};

export const configuratorColors = {
  // Primary button color when selected
  selected: "bg-[#667eea]",
  // Hover color for selected buttons
  selectedHover: "hover:bg-[#667eea]",
  // Unselected button styles
  unselected: "border-gray-100 bg-white text-gray-900",
  // Hover color for unselected buttons
  unselectedHover: "hover:border-gray-100",
};
