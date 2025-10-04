import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rumasa - Rumah Sesuai Kebutuhan Anda",
  description:
    "Kenyamanan ruang tinggal setiap orang berbeda. Rumasa menyediakan hingga 300 kombinasi denah agar ruang hidup Anda pas—sekarang dan nanti.",
  keywords: ["rumah", "desain rumah", "custom home", "modular home", "rumasa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
