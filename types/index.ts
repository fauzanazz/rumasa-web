// Data Models
export interface ReasonItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string | null;
}

export type Lantai = "2.5" | "3.5";
export type Style = "Noir" | "Light Concrete" | "Terracota";

export interface EstimateInput {
  lantai: Lantai;
  ground: string[];
  mid2: string[];
  mid3: string[] | null;
  top: string[];
  style: Style;
  tanah_m2: number;
}

export interface EstimateOutput {
  luas_bangunan_m2: number;
  harga_per_m2: number;
  opsi_tambahan: Array<{ label: string; harga: number }>;
  subtotal: number;
  catatan: string[];
}

export interface CombinationInput {
  lantai: string;
  ground: string[];
  mid2: string[];
  mid3: string[] | null;
  top: string[];
  style: string;
  tanah_m2: number;
}

export interface ConsultationFormInput {
  nama: string;
  email: string;
  telepon: string;
  waktu_preferensi: string;
  catatan: string;
  combo: CombinationInput | null;
}

// Configuration Types
export interface TypeItem {
  key: string;
  title: string;
  bullets: string[];
  body: string;
}

export interface PopularDesigns {
  ground_floor: string[];
  mid_floor_2: string[];
  mid_floor_3_optional: string[];
  top_floor: string[];
}
