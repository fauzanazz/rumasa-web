"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type ExteriorStyle = "Modern Glass" | "Warm Wood" | "Natural Stone" | "Mixed Materials";
type RoofStyle = "Flat Roof" | "Gable Roof" | "Shed Roof" | "Butterfly Roof";
type ColorScheme = "Neutral Tones" | "Warm Earth" | "Cool Blues";

export function Configurator() {
  const [exteriorStyle, setExteriorStyle] = useState<ExteriorStyle>("Mixed Materials");
  const [roofStyle, setRoofStyle] = useState<RoofStyle>("Butterfly Roof");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("Cool Blues");
  const [squareFootage, setSquareFootage] = useState(2400);
  const [bedrooms, setBedrooms] = useState(3);
  const [estimatedPrice, setEstimatedPrice] = useState(852000);

  // Calculate price based on selections
  useEffect(() => {
    let basePrice = squareFootage * 300; // $300 per sq ft base

    // Exterior style pricing
    const exteriorPricing: Record<ExteriorStyle, number> = {
      "Modern Glass": 1.3,
      "Warm Wood": 1.1,
      "Natural Stone": 1.2,
      "Mixed Materials": 1.15,
    };

    // Roof style pricing
    const roofPricing: Record<RoofStyle, number> = {
      "Flat Roof": 1.0,
      "Gable Roof": 1.05,
      "Shed Roof": 1.02,
      "Butterfly Roof": 1.08,
    };

    // Color scheme pricing
    const colorPricing: Record<ColorScheme, number> = {
      "Neutral Tones": 1.0,
      "Warm Earth": 1.03,
      "Cool Blues": 1.05,
    };

    const finalPrice =
      basePrice *
      exteriorPricing[exteriorStyle] *
      roofPricing[roofStyle] *
      colorPricing[colorScheme];

    setEstimatedPrice(Math.round(finalPrice));
  }, [exteriorStyle, roofStyle, colorScheme, squareFootage, bedrooms]);

  const handleConsultation = () => {
    // Redirect to consultation page with config
    window.location.href = "/konsultasi";
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Design Your Home
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Configuration Options */}
          <div className="space-y-8">
            {/* Exterior Style */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exterior Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {(["Modern Glass", "Warm Wood", "Natural Stone", "Mixed Materials"] as ExteriorStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setExteriorStyle(style)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      exteriorStyle === style
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:border-blue-400"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Roof Style */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Roof Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {(["Flat Roof", "Gable Roof", "Shed Roof", "Butterfly Roof"] as RoofStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setRoofStyle(style)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      roofStyle === style
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:border-blue-400"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Color Scheme</h3>
              <div className="grid grid-cols-3 gap-3">
                {(["Neutral Tones", "Warm Earth", "Cool Blues"] as ColorScheme[]).map((scheme) => (
                  <button
                    key={scheme}
                    onClick={() => setColorScheme(scheme)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      colorScheme === scheme
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-900 hover:border-blue-400"
                    }`}
                  >
                    {scheme}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Controls */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Size</h3>
              <div className="space-y-4">
                {/* Square Footage */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-700 font-medium">Square Footage: {squareFootage} sq ft</label>
                  </div>
                  <input
                    type="range"
                    min="1200"
                    max="4000"
                    step="100"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-700 font-medium">Bedrooms: {bedrooms}</label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Estimated Price */}
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Estimated Price</h3>
              <p className="text-4xl font-bold text-blue-600">${estimatedPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">*Base price includes standard finishes</p>
            </div>
          </div>

          {/* Right Column - Preview and Configuration Summary */}
          <div className="space-y-6">
            {/* House Preview */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full max-w-sm">
                {/* Simple house illustration */}
                <div className="flex flex-col items-center">
                  {/* Roof */}
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: '160px solid transparent',
                      borderRight: '160px solid transparent',
                      borderBottom: `80px solid ${
                        roofStyle === "Flat Roof" ? "#64748b" :
                        roofStyle === "Butterfly Roof" ? "#64748b" :
                        roofStyle === "Gable Roof" ? "#475569" : "#64748b"
                      }`,
                    }}
                  />

                  {/* House body */}
                  <div
                    className="w-80 h-32 relative"
                    style={{
                      backgroundColor:
                        colorScheme === "Cool Blues" ? "#cbd5e1" :
                        colorScheme === "Warm Earth" ? "#d1d5db" :
                        "#e5e7eb",
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

            {/* Current Configuration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Configuration</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-semibold text-gray-900">{exteriorStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Roof:</span>
                  <span className="font-semibold text-gray-900">{roofStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Colors:</span>
                  <span className="font-semibold text-gray-900">{colorScheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold text-gray-900">{squareFootage} sq ft, {bedrooms} bedrooms</span>
                </div>
              </div>

              <Button
                onClick={handleConsultation}
                className="w-full mt-6"
                size="lg"
              >
                Request Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
