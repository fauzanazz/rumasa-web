"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#f2dd73] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo-01.webp"
                alt="Rumasa Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("popular-designs")}
              className="text-gray-700 hover:text-[#0d3451] transition-colors"
            >
              Desain
            </button>
            <button
              onClick={() => scrollToSection("configurator")}
              className="text-gray-700 hover:text-[#0d3451] transition-colors"
            >
              Kebutuhan Ruang
            </button>
            <button
              onClick={() => scrollToSection("why-choose-rumasa")}
              className="text-gray-700 hover:text-[#0d3451] transition-colors"
            >
              Tentang Rumasa
            </button>
            <button
              onClick={() => scrollToSection("why-choose-rumasa")}
              className="bg-[#0d3451] text-white hover:bg-[#0d3451]/80 px-4 py-2 rounded-md"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#0d3451]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection("popular-designs")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#0d3451] hover:bg-gray-50 rounded-md"
            >
              Desain
            </button>
            <button
              onClick={() => scrollToSection("configurator")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#0d3451] hover:bg-gray-50 rounded-md"
            >
              Kebutuhan Ruang
            </button>
            <button
              onClick={() => scrollToSection("why-choose-rumasa")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#0d3451] hover:bg-gray-50 rounded-md"
            >
              Tentang Rumasa
            </button>
            <button
              onClick={() => scrollToSection("why-choose-rumasa")}
              className="block bg-[#0d3451] text-white w-full text-left px-3 py-2 hover:bg-[#0d3451]/80 rounded-md"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
