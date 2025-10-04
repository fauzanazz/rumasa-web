import { google } from "googleapis";
import { env } from "@/config/env";

// Initialize Google Sheets API
function getGoogleSheetsClient() {
  if (!env.GOOGLE_PRIVATE_KEY || !env.GOOGLE_CLIENT_EMAIL) {
    throw new Error("Missing Google Sheets credentials");
  }

  const auth = new google.auth.JWT({
    email: env.GOOGLE_CLIENT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

// Append data to a specific range
export async function appendSheetData(range: string, values: unknown[][]): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: env.RUMASA_SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
    return true;
  } catch (error) {
    console.error(`Error appending to sheet range ${range}:`, error);
    return false;
  }
}