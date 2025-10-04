export const env = {
  // Google Sheets
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID || "",
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL || "",
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  RUMASA_SHEET_ID: process.env.RUMASA_SHEET_ID || "",

  // WhatsApp
  WHATSAPP_PHONE: process.env.WHATSAPP_PHONE || "628123456789",

  // Site URL
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
