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
      // Save to spreadsheet
      const result = await saveQuickContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      if (result.ok) {
        // Create WhatsApp message
        const message = `Halo Rumasa! Saya ${formData.name} ingin berkonsultasi tentang rumah Rumasa.\n\nEmail: ${formData.email}\nTelepon: ${formData.phone}`;
        const { url } = await createWhatsAppLink({});

        // Redirect to WhatsApp with custom message
        const whatsappUrl = url.split('?text=')[0] + '?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');

        // Reset form
        setFormData({ name: "", email: "", phone: "" });
      } else {
        alert('Gagal menyimpan data. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
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
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white placeholder:text-gray-500"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white placeholder:text-gray-500"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Mengirim..." : "Get Started"}
        </button>
      </form>
    </div>
  );
}
