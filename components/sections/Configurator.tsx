"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { popularDesigns, configuratorColors } from "@/config/copy";

type Lantai = "2.5" | "3.5";
type Style = "Noir" | "Light Concrete" | "Terracota";

// Module sizes in m²
const MODULE_SIZES: Record<string, number> = {
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

const PRICE_PER_M2 = 15000000; // IDR 15 juta per m²

export function Configurator() {
  const [lantai, setLantai] = useState<Lantai>("2.5");
  const [ground, setGround] = useState<string>("");
  const [mid2, setMid2] = useState<string>("");
  const [mid3, setMid3] = useState<string>("");
  const [top, setTop] = useState<string>("");
  const [style, setStyle] = useState<Style>("Noir");
  const [luasBangunan, setLuasBangunan] = useState(0);
  const [estimasiBiaya, setEstimasiBiaya] = useState(0);

  const tanah_m2 = 49;

  // Single selection helper
  const selectOption = (
    current: string,
    item: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (current === item) {
      setter(""); // Deselect if clicking the same item
    } else {
      setter(item); // Select the new item
    }
  };

  // Calculate building area and estimated cost
  useEffect(() => {
    let totalArea = 0;

    // Add ground floor area
    if (ground) {
      totalArea += MODULE_SIZES[ground] || 0;
    }

    // Add mid floor 2 area
    if (mid2) {
      totalArea += MODULE_SIZES[mid2] || 0;
    }

    // Add mid floor 3 area if 3.5 lantai
    if (lantai === "3.5" && mid3) {
      totalArea += MODULE_SIZES[mid3] || 0;
    }

    // Add top floor area
    if (top) {
      totalArea += MODULE_SIZES[top] || 0;
    }

    setLuasBangunan(totalArea);

    // Calculate base price
    let basePrice = totalArea * PRICE_PER_M2;

    // Add style premium
    const stylePremium: Record<Style, number> = {
      "Noir": 50000000,
      "Light Concrete": 45000000,
      "Terracota": 55000000,
    };

    const totalPrice = basePrice + stylePremium[style];
    setEstimasiBiaya(totalPrice);
  }, [lantai, ground, mid2, mid3, top, style]);

  const handleConsultation = () => {
    window.location.href = "/konsultasi";
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="configurator" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Desain Rumah Anda
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Configuration Options */}
          <div className="space-y-8">
            {/* Pilihan Lantai */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pilihan Lantai</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLantai("2.5")}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    lantai === "2.5"
                      ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                      : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                  }`}
                >
                  2,5 Lantai
                </button>
                <button
                  onClick={() => setLantai("3.5")}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    lantai === "3.5"
                      ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                      : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                  }`}
                >
                  3,5 Lantai *
                </button>
              </div>
            </div>

            {/* Ground Floor */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ground Floor</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularDesigns.ground_floor.map((item) => (
                  <button
                    key={item}
                    onClick={() => selectOption(ground, item, setGround)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      ground === item
                        ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                        : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mid Floor (Lantai 2) */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mid Floor (Lantai 2)</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularDesigns.mid_floor_2.map((item) => (
                  <button
                    key={item}
                    onClick={() => selectOption(mid2, item, setMid2)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      mid2 === item
                        ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                        : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mid Floor (Lantai 3) - Conditional */}
            {lantai === "3.5" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mid Floor (Lantai 3) *</h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularDesigns.mid_floor_3_optional.map((item) => (
                    <button
                      key={item}
                      onClick={() => selectOption(mid3, item, setMid3)}
                      className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        mid3 === item
                          ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                          : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Top Floor */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Floor</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularDesigns.top_floor.map((item) => (
                  <button
                    key={item}
                    onClick={() => selectOption(top, item, setTop)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      top === item
                        ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                        : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Style */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pilihan Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {(["Noir", "Light Concrete", "Terracota"] as Style[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      style === s
                        ? `${configuratorColors.selected} ${configuratorColors.selectedHover} text-white`
                        : `${configuratorColors.unselected} ${configuratorColors.unselectedHover}`
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimasi Biaya */}
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Estimasi Biaya</h3>
              <p className="text-4xl font-bold text-blue-600">{formatIDR(estimasiBiaya)}</p>
              <p className="text-sm text-gray-600 mt-2">*Tidak termasuk pajak dan biaya notaris</p>
            </div>
          </div>

          {/* Right Column - Preview and Summary */}
          <div className="space-y-6">
            {/* House Preview */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full max-w-sm">
                {/* Simple house illustration */}
                <div className="flex flex-col items-center">
                  {/* Roof */}
                  <div
                    className={`w-0 h-0 ${
                      style === "Noir" ? "border-b-gray-900" :
                      style === "Terracota" ? "border-b-orange-800" :
                      "border-b-gray-600"
                    }`}
                    style={{
                      borderLeft: '160px solid transparent',
                      borderRight: '160px solid transparent',
                      borderBottom: '80px solid',
                    }}
                  />

                  {/* House body */}
                  <div
                    className="w-80 h-32 relative"
                    style={{
                      backgroundColor:
                        style === "Noir" ? "#1f2937" :
                        style === "Terracota" ? "#ea580c" :
                        "#9ca3af",
                      marginTop: '-4px'
                    }}
                  >
                    {/* Windows */}
                    <div className="absolute top-4 left-12 w-10 h-8 bg-blue-300 border-2 border-blue-400"></div>
                    <div className="absolute top-4 left-28 w-10 h-8 bg-blue-300 border-2 border-blue-400"></div>
                    <div className="absolute top-4 right-28 w-12 h-10 bg-blue-400 border-2 border-blue-500"></div>
                    <div className="absolute top-4 right-12 w-10 h-8 bg-blue-300 border-2 border-blue-400"></div>

                    {/* Door */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-16 bg-amber-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kombinasi Desain Pilihan Anda */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kombinasi Desain Pilihan Anda</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah lantai:</span>
                  <span className="font-semibold text-gray-900">{lantai} Lantai</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ground Floor:</span>
                  <span className="font-semibold text-gray-900">{ground || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mid Floor (Lantai 2):</span>
                  <span className="font-semibold text-gray-900">{mid2 || "-"}</span>
                </div>
                {lantai === "3.5" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mid Floor (Lantai 3) *:</span>
                    <span className="font-semibold text-gray-900">{mid3 || "-"}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Top Floor:</span>
                  <span className="font-semibold text-gray-900">{top || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-semibold text-gray-900">{style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Luas Tanah:</span>
                  <span className="font-semibold text-gray-900">{tanah_m2} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Luas Bangunan:</span>
                  <span className="font-semibold text-gray-900">{luasBangunan} m²</span>
                </div>
              </div>

              <Button
                onClick={handleConsultation}
                className="w-full mt-6"
                size="lg"
              >
                Jadwalkan Konsultasi Sekarang!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
