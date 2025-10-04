"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { consultationFormSchema, type ConsultationFormData } from "@/lib/validations";
import { submitConsultation } from "@/actions/sheets";

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitConsultation({
        ...data,
        combo: null, // Can be extended to include saved combo from localStorage
        catatan: data.catatan || "",
      });

      if (result.ok) {
        setSubmitResult({
          success: true,
          message: `Terima kasih! Konsultasi Anda telah dijadwalkan. ID: ${result.ticketId}`,
        });
        reset();
      } else {
        setSubmitResult({
          success: false,
          message: "error" in result ? result.error : "Terjadi kesalahan",
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Jadwalkan Konsultasi
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nama */}
          <div>
            <Label htmlFor="nama">Nama Lengkap *</Label>
            <Input id="nama" {...register("nama")} placeholder="John Doe" />
            {errors.nama && (
              <p className="text-sm text-red-600 mt-1">{errors.nama.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Telepon */}
          <div>
            <Label htmlFor="telepon">Nomor Telepon *</Label>
            <Input
              id="telepon"
              type="tel"
              {...register("telepon")}
              placeholder="08123456789"
            />
            {errors.telepon && (
              <p className="text-sm text-red-600 mt-1">{errors.telepon.message}</p>
            )}
          </div>

          {/* Waktu Preferensi */}
          <div>
            <Label htmlFor="waktu_preferensi">Waktu Preferensi Konsultasi *</Label>
            <select
              id="waktu_preferensi"
              {...register("waktu_preferensi")}
              className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <option value="">Pilih waktu</option>
              <option value="Pagi (09:00 - 12:00)">Pagi (09:00 - 12:00)</option>
              <option value="Siang (12:00 - 15:00)">Siang (12:00 - 15:00)</option>
              <option value="Sore (15:00 - 18:00)">Sore (15:00 - 18:00)</option>
            </select>
            {errors.waktu_preferensi && (
              <p className="text-sm text-red-600 mt-1">{errors.waktu_preferensi.message}</p>
            )}
          </div>

          {/* Catatan */}
          <div>
            <Label htmlFor="catatan">Catatan (Opsional)</Label>
            <Textarea
              id="catatan"
              {...register("catatan")}
              placeholder="Tuliskan pertanyaan atau kebutuhan khusus Anda..."
            />
            {errors.catatan && (
              <p className="text-sm text-red-600 mt-1">{errors.catatan.message}</p>
            )}
          </div>

          {/* Submit Result */}
          {submitResult && (
            <div
              className={`p-4 rounded-md ${
                submitResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              {submitResult.message}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Jadwalkan Konsultasi"}
          </Button>
        </form>
      </div>
    </section>
  );
}
