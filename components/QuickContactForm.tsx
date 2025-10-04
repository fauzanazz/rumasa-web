"use client";

import { useState } from "react";
import { saveQuickContact } from "@/actions/sheets";
import { createWhatsAppLink } from "@/actions/whatsapp";

export function QuickContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', { name: formData.name, email: formData.email, phone: formData.phone });

      // Save to spreadsheet
      const result = await saveQuickContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      console.log('Save result:', result);

      if (result.ok) {
        // Create WhatsApp message
        const message = `Halo Rumasa! Saya ${formData.name} ingin berkonsultasi tentang rumah Rumasa.

Email: ${formData.email}
Telepon: ${formData.phone}`;

        // Build WhatsApp URL directly
        const whatsappPhone = '6282123747018'; // From env
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

        console.log('Opening WhatsApp URL:', whatsappUrl);

        // Open WhatsApp in new tab
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Popup blocked - try window.location
          console.log('Popup blocked, using window.location');
          window.location.href = whatsappUrl;
        }

        // Reset form
        setFormData({ name: "", email: "", phone: "" });
        alert('Data berhasil disimpan! Membuka WhatsApp...');
      } else {
        console.error('Failed to save:', result.error);
        alert(`Gagal menyimpan data: ${result.error || 'Silakan coba lagi.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Silakan coba lagi.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Ingin Punya Rumah dari Rumasa ?
      </h3>
      <p className="text-gray-700 mb-8">
        Jadwalkan konsultasi dengan tim Rumasa sekarang dan dapatkan penawaran rumah idaman!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama Anda"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Nomor Telepon"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          {isSubmitting ? "Mengirim..." : "Get Started"}
        </button>
      </form>
    </div>
  );
}
