import { footerCopy } from "@/config/copy";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Rumasa</h3>
            <p className="text-gray-400">
              Rumah yang dirancang sesuai kebutuhan hidup Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/desain" className="text-gray-400 hover:text-white transition-colors">
                  Desain
                </Link>
              </li>
              <li>
                <Link
                  href="/konsultasi"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Konsultasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <p className="text-gray-400 mb-2">Email: hello@rumasa.com</p>
            <p className="text-gray-400">Telepon: (021) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">{footerCopy.disclaimer}</p>
          <p className="text-gray-500 text-sm">{footerCopy.company}</p>
        </div>
      </div>
    </footer>
  );
}
