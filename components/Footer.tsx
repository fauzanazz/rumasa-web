import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Rumasa</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating timeless midcentury modern homes for the next generation.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Custom Home Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Construction
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Landscaping
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>✉️</span>
                <span>hello@rumasa.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>📍</span>
                <span>Los Angeles, CA</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-[#0d3451] rounded flex items-center justify-center hover:bg-[#0d3451]/80 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-white text-lg">in</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-white text-lg">📷</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-white text-lg">f</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Rumasa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
