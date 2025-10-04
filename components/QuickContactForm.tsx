"use client";

import { useState } from "react";

export function QuickContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    window.location.href = "/konsultasi";
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
          className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </form>
    </div>
  );
}
