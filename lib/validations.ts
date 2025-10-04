import { z } from "zod";

export const consultationFormSchema = z.object({
  nama: z.string().min(2, "Nama harus minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  telepon: z.string().min(10, "Nomor telepon tidak valid").max(15, "Nomor telepon terlalu panjang"),
  waktu_preferensi: z.string().min(1, "Pilih waktu preferensi"),
  catatan: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
