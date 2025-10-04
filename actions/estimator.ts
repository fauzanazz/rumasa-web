"use server";

import type { EstimateInput, EstimateOutput } from "@/types";

// Configuration - can be moved to env or database
const PRICE_PER_M2 = 15000000; // IDR 15 juta per m²
const MODULE_SIZES: Record<string, number> = {
  // Ground floor modules (in m²)
  "Room Plus A": 25,
  "Room Plus B": 28,
  "Carport Plus A": 20,
  "Carport Plus B": 22,
  "Kitchen Plus": 18,

  // Mid floor modules
  "Room Plus": 20,
  "Living Plus A": 30,
  "Living Plus B": 32,
  "Studio Apartment": 35,
  "Studio Basic": 25,

  // Top floor modules
  "Living Plus": 30,
};

function calculateBuildingArea(input: EstimateInput): number {
  let totalArea = 0;

  // Add ground floor area
  input.ground.forEach((module) => {
    totalArea += MODULE_SIZES[module] || 0;
  });

  // Add mid floor 2 area
  input.mid2.forEach((module) => {
    totalArea += MODULE_SIZES[module] || 0;
  });

  // Add mid floor 3 area if 3.5 lantai
  if (input.lantai === "3.5" && input.mid3) {
    input.mid3.forEach((module) => {
      totalArea += MODULE_SIZES[module] || 0;
    });
  }

  // Add top floor area
  input.top.forEach((module) => {
    totalArea += MODULE_SIZES[module] || 0;
  });

  return totalArea;
}

export async function calculateEstimate(payload: EstimateInput): Promise<EstimateOutput> {
  // Calculate building area based on selected modules
  const luas_bangunan_m2 = calculateBuildingArea(payload);

  // Calculate base price
  const basePrice = luas_bangunan_m2 * PRICE_PER_M2;

  // Optional additions based on style
  const opsi_tambahan: Array<{ label: string; harga: number }> = [];

  if (payload.style === "Noir") {
    opsi_tambahan.push({ label: "Premium Noir Finishing", harga: 50000000 });
  } else if (payload.style === "Light Concrete") {
    opsi_tambahan.push({ label: "Premium Concrete Finishing", harga: 45000000 });
  } else if (payload.style === "Terracota") {
    opsi_tambahan.push({ label: "Premium Terracota Finishing", harga: 55000000 });
  }

  // Calculate subtotal
  const opsiTotal = opsi_tambahan.reduce((sum, item) => sum + item.harga, 0);
  const subtotal = basePrice + opsiTotal;

  // Notes
  const catatan = [
    "*Tidak termasuk pajak dan biaya notaris.",
    "Estimasi bersifat indikatif; detail akhir berdasarkan survei & spesifikasi pilihan.",
  ];

  return {
    luas_bangunan_m2,
    harga_per_m2: PRICE_PER_M2,
    opsi_tambahan,
    subtotal,
    catatan,
  };
}
