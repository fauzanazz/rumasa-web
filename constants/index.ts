// Configuration constants
export const PRICE_PER_M2 = 15000000; // IDR 15 juta per m²

// Animation constants
export const ANIM_MS = 700;
export const TOP_OVERLAP = -10;
export const MID_OVERLAP = -13;
export const SLIDE_TRANSITION = "transform 700ms ease-in-out, opacity 700ms ease-in-out, filter 700ms ease-in-out";

// Module sizes in m²
export const MODULE_SIZES: Record<string, number> = {
  // Ground floor
  "Room Plus A": 25,
  "Room Plus B": 28,
  "Carport Plus A": 20,
  "Carport Plus B": 22,
  "Kitchen Plus": 18,
  // Mid floor
  "Room Plus": 20,
  "Living Plus A": 30,
  "Living Plus B": 32,
  "Studio Apartment": 35,
  "Studio Basic": 25,
  // Top floor
  "Living Plus": 30,
};

// Style premiums
export const STYLE_PREMIUMS: Record<string, number> = {
  "Noir": 50000000,
  "Light Concrete": 45000000,
  "Terracota": 55000000,
};

// Floor options data
export const GROUND_FLOOR_OPTIONS = [
  { id: "room-plus-a", name: "Room A", image: "/Isometri/1A_1.webp", size: 25 },
  { id: "room-plus-b", name: "Room B", image: "/Isometri/1A_2.webp", size: 25 },
  { id: "carport-plus-a", name: "Kitchen", image: "/Isometri/1B.webp", size: 25 },
  { id: "carport-plus-b", name: "Carport A", image: "/Isometri/1C_1.webp", size: 25 },
  { id: "carport-plus-c", name: "Carport B", image: "/Isometri/1C_2.webp", size: 25 },
];

export const MID_FLOOR_2_OPTIONS = [
  { id: "bedroom-a", name: "Bedroom A", image: "/Isometri/2A.webp", size: 25 },
  { id: "bedroom-b", name: "Bedroom B", image: "/Isometri/2B.webp", size: 25 },
  { id: "canvas-a", name: "Canvas A", image: "/Isometri/2C.webp", size: 25 },
  { id: "canvas-b", name: "Canvas B", image: "/Isometri/2D.webp", size: 25 },
  { id: "studio-a", name: "Studio A", image: "/Isometri/2E.webp", size: 25 },
];

export const MID_FLOOR_3_OPTIONS = [
  { id: "bedroom-a-3", name: "Bedroom A", image: "/Isometri/2A.webp", size: 25 },
  { id: "bedroom-b-3", name: "Bedroom B", image: "/Isometri/2B.webp", size: 25 },
  { id: "canvas-a-3", name: "Canvas A", image: "/Isometri/2C.webp", size: 25 },
  { id: "canvas-b-3", name: "Canvas B", image: "/Isometri/2D.webp", size: 25 },
  { id: "studio-a-3", name: "Studio A", image: "/Isometri/2E.webp", size: 25 },
];

export const TOP_FLOOR_OPTIONS = [
  { id: "bedroom-a-top-1", name: "Bedroom A", image: "/Isometri/3A.webp", size: 25 },
  { id: "bedroom-b-top-1", name: "Bedroom B", image: "/Isometri/3B.webp", size: 25 },
  { id: "bedroom-a-top-2", name: "Bedroom A", image: "/Isometri/3A.webp", size: 25 },
  { id: "bedroom-b-top-2", name: "Bedroom B", image: "/Isometri/3B.webp", size: 25 },
];

export const GENTENG_ROOF = {
  id: "genteng-roof",
  name: "Genteng Roof",
  image: "/Isometri/Genteng.webp",
  size: 0,
};

// Default values
export const DEFAULT_TANAH_M2 = 49;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: "Terjadi kesalahan. Silakan coba lagi.",
  NETWORK: "Koneksi bermasalah. Periksa internet Anda.",
  VALIDATION: "Data yang dimasukkan tidak valid.",
  SUBMISSION: "Gagal mengirim data. Silakan coba lagi.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: "Data berhasil disimpan!",
  CONSULTATION_SCHEDULED: "Konsultasi berhasil dijadwalkan!",
} as const;
