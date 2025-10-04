"use server";

import { env } from "@/config/env";
import type { CombinationInput } from "@/types";

interface WhatsAppContext {
  reasonId?: string;
  reasonTitle?: string;
  combo?: CombinationInput;
}

export async function createWhatsAppLink(context: WhatsAppContext): Promise<{ url: string }> {
  const phone = env.WHATSAPP_PHONE;
  let message = "";

  if (context.reasonTitle) {
    // Inquiry about a specific reason
    message = `Halo Rumasa! Saya tertarik dengan alasan: *${context.reasonTitle}*. Bisa jelaskan lebih lanjut?`;
  } else if (context.combo) {
    // Inquiry about a specific combination
    const { lantai, ground, mid2, mid3, top, style, tanah_m2 } = context.combo;
    message = `Halo Rumasa! Saya tertarik dengan kombinasi berikut:
Lantai: ${lantai}
Ground: ${ground.join(", ")}
Mid Floor 2: ${mid2.join(", ")}
${mid3 ? `Mid Floor 3: ${mid3.join(", ")}` : ""}
Top: ${top.join(", ")}
Style: ${style}
Tanah: ${tanah_m2} m²

Mohon info estimasi & waktu pengerjaan.`;
  } else {
    // General inquiry
    message = "Halo Rumasa! Saya ingin tahu lebih lanjut tentang rumah Rumasa.";
  }

  const encodedMessage = encodeURIComponent(message.trim());
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  return { url };
}
