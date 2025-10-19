"use client";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";

type Lantai = "2.5" | "3.5";

// Floor option interface
interface FloorOption {
  id: string;
  name: string;
  image: string;
  size: number; // in m²
}

// Floor options data
const GROUND_FLOOR_OPTIONS: FloorOption[] = [
  { id: "room-plus-a", name: "Room Plus A", image: "/Isometri/1A.png", size: 25 },
  { id: "room-plus-b", name: "Room Plus B", image: "/Isometri/2A.png", size: 28 },
  { id: "carport-plus-a", name: "Carport Plus A", image: "/Isometri/3A.png", size: 20 },
  { id: "carport-plus-b", name: "Carport Plus B", image: "/Isometri/4A.png", size: 22 },
];

const MID_FLOOR_2_OPTIONS: FloorOption[] = [
  { id: "room-plus", name: "Room Plus", image: "/Isometri/1B.png", size: 20 },
  { id: "living-plus-a", name: "Living Plus A", image: "/Isometri/2B.png", size: 30 },
  { id: "living-plus-b", name: "Living Plus B", image: "/Isometri/3B.png", size: 32 },
];

const MID_FLOOR_3_OPTIONS: FloorOption[] = [
  { id: "room-plus-3", name: "Room Plus", image: "/Isometri/1C.png", size: 20 },
  { id: "living-plus-a-3", name: "Living Plus A", image: "/Isometri/2C.png", size: 30 },
  { id: "living-plus-b-3", name: "Living Plus B", image: "/Isometri/3C.png", size: 32 },
];

const TOP_FLOOR_OPTIONS: FloorOption[] = [
  { id: "room-plus-top", name: "Room Plus", image: "/Isometri/Genteng.png", size: 20 },
];

const PRICE_PER_M2 = 15000000; // IDR 15 juta per m²

const ANIM_MS = 700;
const TOP_OVERLAP = -15;
const MID_OVERLAP = -20;
const SLIDE_TRANSITION = "transform 700ms ease-in-out, opacity 700ms ease-in-out, filter 700ms ease-in-out";

interface FloorLayerProps {
  title: string;
  options: FloorOption[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  zIndex: number;
  zoom: number;
}

type SlidePosition = "current" | "prev" | "next" | "hidden";

const FloorLayer = memo(function FloorLayer({
  title,
  options,
  currentIndex,
  onPrev,
  onNext,
  zIndex,
  zoom,
}: FloorLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Preload once
  useEffect(() => {
    options.forEach((o) => {
      const img = new Image();
      img.decoding = "async";
      img.src = o.image;
    });
  }, [options]);


  const len = options.length;
  const hasMultiple = len > 1;
  const zoomScale = zoom / 100;
  const widthPercent = zoomScale * 100;
  const sideOffset = ((1 - zoomScale) * 50).toFixed(3);

  const containerStyle: CSSProperties = {
    zIndex,
    width: `${widthPercent}%`,
    marginLeft: `${sideOffset}%`,
    marginRight: `${sideOffset}%`,
    transition: "width 300ms ease, margin 300ms ease",
  };

  const scheduleTransitionReset = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      timeoutRef.current = null;
    }, ANIM_MS) as unknown as number;
  }, []);

  const startTransition = useCallback(
    (dir: "prev" | "next") => {
      if (!hasMultiple || isTransitioning) return;
      setIsTransitioning(true);
      scheduleTransitionReset();
      if (dir === "prev") onPrev();
      else onNext();
    },
    [hasMultiple, isTransitioning, onNext, onPrev, scheduleTransitionReset],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasMultiple && isTransitioning) {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setIsTransitioning(false);
      timeoutRef.current = null;
    }
  }, [hasMultiple, isTransitioning]);

  // Touch swipe (kept), no wheel at all
  useEffect(() => {
    const el = layerRef.current;
    if (!el || !hasMultiple) return;

    let startX = 0,
      startY = 0,
      active = false;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      active = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!active || isTransitioning) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) {
        active = false;
        if (dx < 0) startTransition("next");
        else startTransition("prev");
      }
    };
    const onTouchEnd = () => {
      active = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [hasMultiple, isTransitioning, startTransition]);

  // Keyboard support (kept)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultiple || isTransitioning) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      startTransition("prev");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      startTransition("next");
    } else if (e.key === "Home") {
      e.preventDefault();
      if (currentIndex === 0) return;
      startTransition("prev");
    } else if (e.key === "End") {
      e.preventDefault();
      if (currentIndex === len - 1) return;
      startTransition("next");
    }
  };

  const getPosition = useCallback(
    (idx: number): SlidePosition => {
      if (!hasMultiple) return "current";
      if (idx === currentIndex) return "current";

      const prevIdx = (currentIndex - 1 + len) % len;
      const nextIdx = (currentIndex + 1) % len;

      if (idx === prevIdx && idx === nextIdx) {
        // two-item carousel: treat the sibling as a single preview
        return "next";
      }

      if (idx === prevIdx) return "prev";
      if (idx === nextIdx) return "next";
      return "hidden";
    },
    [currentIndex, hasMultiple, len],
  );

  const activeOption = options[currentIndex] ?? options[0];
  if (!activeOption) {
    return null;
  }

  // Transform calculator (isometric slide)
  // We keep the same DOM nodes alive (stable keys + memoized component) and only
  // tweak their transforms/filters. React diffs those style props without
  // remounting, so the browser interpolates the values via CSS transitions and
  // the preview appears to glide rather than flash.
  const activeSlideStyle = (position: SlidePosition): CSSProperties => {
    const previewFilter = "grayscale(70%) brightness(0.7)";
    const transition = isTransitioning ? SLIDE_TRANSITION : "none";

    if (!hasMultiple) {
      return {
        transform: "translate3d(0,0,0) scale(1)",
        opacity: 1,
        zIndex: 3,
        filter: "none",
        transition,
        transformOrigin: "center center",
        willChange: "transform, opacity",
        pointerEvents: "auto",
      };
    }

    switch (position) {
      case "current":
        return {
          transform: "translate3d(0,0,0) scale(1)",
          opacity: 1,
          zIndex: 4,
          filter: "none",
          transition,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          pointerEvents: "auto",
        };
      case "prev":
        return {
          transform: "translate3d(-60%,30%,0) scale(0.85)",
          opacity: 0.35,
          zIndex: 2,
          filter: previewFilter,
          transition,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          pointerEvents: "none",
        };
      case "next":
        return {
          transform: "translate3d(60%,-30%,0) scale(0.85)",
          opacity: 0.35,
          zIndex: 2,
          filter: previewFilter,
          transition,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          pointerEvents: "none",
        };
      default:
        return {
          transform: "translate3d(0,25%, -140px) scale(0.7)",
          opacity: 0,
          zIndex: 1,
          filter: previewFilter,
          transition,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          pointerEvents: "none",
        };
    }
  };

  // Image component with stable node (no changing key)
  const IsoImage = ({ option, eager = false }: { option: FloorOption; eager?: boolean }) => {
    const [err, setErr] = useState(false);
    if (err) {
      return (
        <div
          className="w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          style={{ height: 200, clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
        >
          <div className="text-center p-6">
            <div className="text-5xl mb-3">🏠</div>
            <p className="text-base font-semibold text-gray-700">{option.name}</p>
            <p className="text-sm text-gray-500 mt-1">{option.size} m²</p>
          </div>
        </div>
      );
    }
    return (
      <img
        src={option.image}
        alt={option.name}
        className="w-full h-auto select-none"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onError={() => setErr(true)}
      />
    );
  };

  return (
    <div
      ref={layerRef}
      className="relative group outline-none"
      style={containerStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <div className="pointer-events-none opacity-0">
          <IsoImage option={activeOption} eager />
        </div>
        {options.map((option, idx) => {
          const position = getPosition(idx);
          const style = activeSlideStyle(position);
          const isCurrent = position === "current";

          return (
            <div
              key={option.id}
              className="absolute inset-0 flex items-center justify-center"
              style={style}
              aria-hidden={!isCurrent}
            >
              <div className="w-full">
                <IsoImage option={option} eager={isCurrent} />
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={() => startTransition("prev")}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/95 hover:bg-white shadow-2xl transition-all duration-300 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 hover:scale-110 z-20 disabled:opacity-50 disabled:cursor-not-allowed focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ left: "16.66%", width: "min(10vw, 10vh)", height: "min(10vw, 10vh)", padding: "min(2vw, 2vh)" }}
              aria-label={`Sebelumnya: ${title}`}
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => startTransition("next")}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/95 hover:bg-white shadow-2xl transition-all duration-300 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 hover:scale-110 z-20 disabled:opacity-50 disabled:cursor-not-allowed focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ left: "83.33%", width: "min(10vw, 10vh)", height: "min(10vw, 10vh)", padding: "min(2vw, 2vh)" }}
              aria-label={`Berikutnya: ${title}`}
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg z-20">
          <p className="font-bold text-gray-900 text-sm">{activeOption.name}</p>
          <p className="text-xs text-gray-600 text-center">{activeOption.size} m² • {title}</p>
        </div>

        {/* Indicators (read-only) */}
        {hasMultiple && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20" aria-hidden="true">
            {options.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-8 shadow-md" : "bg-white/50 w-2"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export function HomeLayoutConfigurator() {
  const [lantai, setLantai] = useState<Lantai>("2.5");
  const [groundIndex, setGroundIndex] = useState(0);
  const [mid2Index, setMid2Index] = useState(0);
  const [mid3Index, setMid3Index] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [zoom, setZoom] = useState(75); // Size: 50 (Small), 75 (Medium), 100 (Large)

  const zoomScale = zoom / 100;
  const tanah_m2 = 49;

  // Get current selections
  const groundSelection = GROUND_FLOOR_OPTIONS[groundIndex];
  const mid2Selection = MID_FLOOR_2_OPTIONS[mid2Index];
  const mid3Selection = MID_FLOOR_3_OPTIONS[mid3Index];
  const topSelection = TOP_FLOOR_OPTIONS[topIndex];

  const luasBangunan = useMemo(() => {
    let totalArea = groundSelection.size + mid2Selection.size + topSelection.size;
    if (lantai === "3.5") totalArea += mid3Selection.size;
    return totalArea;
  }, [lantai, groundSelection, mid2Selection, mid3Selection, topSelection]);

  const estimasiBiaya = useMemo(() => luasBangunan * PRICE_PER_M2, [luasBangunan]);

  const handleConsultation = () => {
    const element = document.getElementById("why-choose-rumasa");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatIDR = (amount: number) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formatted}`;
  };

  const handleGroundPrev = useCallback(() => {
    setGroundIndex((prev) => (prev - 1 + GROUND_FLOOR_OPTIONS.length) % GROUND_FLOOR_OPTIONS.length);
  }, []);

  const handleGroundNext = useCallback(() => {
    setGroundIndex((prev) => (prev + 1) % GROUND_FLOOR_OPTIONS.length);
  }, []);

  const handleMid2Prev = useCallback(() => {
    setMid2Index((prev) => (prev - 1 + MID_FLOOR_2_OPTIONS.length) % MID_FLOOR_2_OPTIONS.length);
  }, []);

  const handleMid2Next = useCallback(() => {
    setMid2Index((prev) => (prev + 1) % MID_FLOOR_2_OPTIONS.length);
  }, []);

  const handleMid3Prev = useCallback(() => {
    setMid3Index((prev) => (prev - 1 + MID_FLOOR_3_OPTIONS.length) % MID_FLOOR_3_OPTIONS.length);
  }, []);

  const handleMid3Next = useCallback(() => {
    setMid3Index((prev) => (prev + 1) % MID_FLOOR_3_OPTIONS.length);
  }, []);

  const handleTopPrev = useCallback(() => {
    setTopIndex((prev) => (prev - 1 + TOP_FLOOR_OPTIONS.length) % TOP_FLOOR_OPTIONS.length);
  }, []);

  const handleTopNext = useCallback(() => {
    setTopIndex((prev) => (prev + 1) % TOP_FLOOR_OPTIONS.length);
  }, []);

  const topOverlapValue = `${TOP_OVERLAP * zoomScale}%`;
  const midOverlapValue = `${MID_OVERLAP * zoomScale}%`;

  return (
    <section
      id="configurator"
      className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 px-4 pt-4">
          Desain Rumah Anda
        </h2>
        <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto px-4">
          Arahkan kursor dan klik panah untuk memilih setiap lantai
        </p>

        {/* Top Controls - Sticky */}
        <div className="sticky top-16 z-50 bg-gradient-to-br from-gray-50 to-gray-100 py-4 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-center px-4">
            {/* Pilihan Lantai */}
            <div className="flex gap-3">
              <button
                onClick={() => setLantai("2.5")}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  lantai === "2.5"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                2,5 Lantai
              </button>
              <button
                onClick={() => setLantai("3.5")}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  lantai === "3.5"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                3,5 Lantai
              </button>
            </div>

            {/* Image Size Selection */}
            <div className="flex gap-3">
              <button
                onClick={() => setZoom(50)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  zoom === 50
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                Small
              </button>
              <button
                onClick={() => setZoom(75)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  zoom === 75
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setZoom(100)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  zoom === 100
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400"
                }`}
              >
                Large
              </button>
            </div>
          </div>
        </div>

        {/* Stacked Floor Visualization - Full Width with Overlap */}
        <div className="relative w-full">
          {/* Top Floor / Roof */}
          <div
            style={{
              marginBottom: topOverlapValue,
              transition: 'margin-bottom 0.3s ease-out'
            }}
          >
            <FloorLayer
              title="Top Floor"
              options={TOP_FLOOR_OPTIONS}
              currentIndex={topIndex}
              onPrev={handleTopPrev}
              onNext={handleTopNext}
              zIndex={30}
              zoom={zoom}
            />
          </div>

          {/* Mid Floor 3 - Conditional */}
          {lantai === "3.5" && (
            <div
              className="animate-[fadeIn_0.3s_ease-out]"
              style={{
                marginBottom: midOverlapValue,
                transition: 'margin-bottom 0.3s ease-out'
              }}
            >
              <FloorLayer
                title="Mid Floor 3"
                options={MID_FLOOR_3_OPTIONS}
                currentIndex={mid3Index}
                onPrev={handleMid3Prev}
                onNext={handleMid3Next}
                zIndex={20}
                zoom={zoom}
              />
            </div>
          )}

          {/* Mid Floor 2 */}
          <div
            style={{
              marginBottom: midOverlapValue,
              transition: 'margin-bottom 0.3s ease-out'
            }}
          >
            <FloorLayer
              title="Mid Floor 2"
              options={MID_FLOOR_2_OPTIONS}
              currentIndex={mid2Index}
              onPrev={handleMid2Prev}
              onNext={handleMid2Next}
              zIndex={10}
              zoom={zoom}
            />
          </div>

          {/* Ground Floor */}
          <FloorLayer
            title="Ground Floor"
            options={GROUND_FLOOR_OPTIONS}
            currentIndex={groundIndex}
            onPrev={handleGroundPrev}
            onNext={handleGroundNext}
            zIndex={0}
            zoom={zoom}
          />
        </div>

        {/* Summary Footer */}
        <div className="mt-12 px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Konfigurasi Anda</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Lantai:</span>
                    <span className="font-semibold">{lantai}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luas Bangunan:</span>
                    <span className="font-semibold">{luasBangunan} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luas Tanah:</span>
                    <span className="font-semibold">{tanah_m2} m²</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Estimasi Biaya</h3>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {formatIDR(estimasiBiaya)}
                </p>
                <p className="text-xs text-gray-500">
                  *Tidak termasuk pajak dan biaya notaris
                </p>
              </div>
            </div>

            <Button onClick={handleConsultation} className="w-full" size="lg">
              Jadwalkan Konsultasi Sekarang!
            </Button>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 mt-6 px-4">
          💡 Tip: Arahkan kursor ke setiap lantai dan klik panah untuk mengubah pilihan. Pilih Small, Medium, atau Large untuk mengatur ukuran tampilan.
        </p>
      </div>
    </section>
  );
}
