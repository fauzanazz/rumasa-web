"use server";

import type { EstimateInput, EstimateOutput } from "@/types";
import { PRICE_PER_M2, MODULE_SIZES, STYLE_PREMIUMS } from "@/constants";

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
  const stylePremium = STYLE_PREMIUMS[payload.style];
  
  if (stylePremium > 0) {
    const styleLabels = {
      "Noir": "Premium Noir Finishing",
      "Light Concrete": "Premium Concrete Finishing", 
      "Terracota": "Premium Terracota Finishing"
    };
    opsi_tambahan.push({ 
      label: styleLabels[payload.style] || "Premium Finishing", 
      harga: stylePremium 
    });
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
