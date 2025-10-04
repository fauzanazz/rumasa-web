import { google } from "googleapis";
import { env } from "@/config/env";
import type { ReasonItem } from "@/types";

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

// Read data from a specific range
export async function readSheetRange(range: string): Promise<unknown[][]> {
  try {
    const sheets = getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: env.RUMASA_SHEET_ID,
      range,
    });

    return (response.data.values as unknown[][]) || [];
  } catch (error) {
    console.error(`Error reading sheet range ${range}:`, error);
    return [];
  }
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

// Parse ReasonItem from sheet row
export function parseReasonItem(row: unknown[]): ReasonItem {
  return {
    id: String(row[0] || ""),
    title: String(row[1] || ""),
    subtitle: String(row[2] || ""),
    badge: row[3] ? String(row[3]) : null,
  };
}

// Helper to get all reasons from the sheet
export async function getReasonsFromSheet(): Promise<ReasonItem[]> {
  const rows = await readSheetRange("Reasons!A2:D");
  return rows.map(parseReasonItem);
}
