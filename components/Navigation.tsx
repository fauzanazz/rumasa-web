"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Rumasa
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/desain" className="text-gray-700 hover:text-blue-600 transition-colors">
              Desain
            </Link>
            <Link
              href="/konsultasi"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Kebutuhan Ruang
            </Link>
            <Link
              href="/konsultasi"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Tentang Rumasa
            </Link>
            <Link href="/konsultasi">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
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
            <Link
              href="/desain"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Desain
            </Link>
            <Link
              href="/konsultasi"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Konsultasi
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
