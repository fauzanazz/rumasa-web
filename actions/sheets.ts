"use server";

import { appendSheetData } from "@/lib/sheets";
import type { CombinationInput, ConsultationFormInput } from "@/types";


// Save design combination to sheet
export async function saveDesignCombinationToSheet(
  combo: CombinationInput,
  fingerprint: string
): Promise<{ ok: boolean; rowId?: string }> {
  try {
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      fingerprint,
      combo.lantai,
      combo.ground.join(", "),
      combo.mid2.join(", "),
      combo.mid3?.join(", ") || "",
      combo.top.join(", "),
      combo.style,
      combo.tanah_m2.toString(),
    ];

    const success = await appendSheetData("Combinations!A2:I", [row]);
    return { ok: success, rowId: success ? timestamp : undefined };
  } catch (error) {
    console.error("Error saving combination:", error);
    return { ok: false };
  }
}

// Submit consultation form
export async function submitConsultation(
  form: ConsultationFormInput
): Promise<{ ok: true; ticketId: string } | { ok: false; error: string }> {
  try {
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      form.nama,
      form.email,
      form.telepon,
      form.waktu_preferensi,
      form.catatan,
      form.combo ? JSON.stringify(form.combo) : "",
    ];

    const success = await appendSheetData("Leads!A2:G", [row]);

    if (success) {
      return { ok: true, ticketId: timestamp };
    } else {
      return { ok: false, error: "Failed to save to spreadsheet" };
    }
  } catch (error) {
    console.error("Error submitting consultation:", error);
    return { ok: false, error: "Server error occurred" };
  }
}

// Log CTA click event
export async function logCtaClick(details: {
  source: "hero" | "cta_banner" | "footer";
  combo?: CombinationInput;
}): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      details.source,
      details.combo ? JSON.stringify(details.combo) : "",
      "", // session_id - can be implemented later
      "", // user_agent
      "", // path
    ];

    await appendSheetData("Events!A2:F", [row]);
  } catch (error) {
    console.error("Error logging CTA click:", error);
  }
}

// Save quick contact form to sheet
export async function saveQuickContact(data: {
  name: string;
  email: string;
  phone: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      "Quick Contact Form", // source
      "", // notes
      "", // combo - not applicable for quick form
    ];

    const success = await appendSheetData("Leads!A2:G", [row]);

    if (success) {
      return { ok: true };
    } else {
      return { ok: false, error: "Failed to save to spreadsheet" };
    }
  } catch (error) {
    console.error("Error saving quick contact:", error);
    return { ok: false, error: "Server error occurred" };
  }
}
