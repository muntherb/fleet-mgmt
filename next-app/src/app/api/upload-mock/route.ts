import saveJsonToDb from "@/scripts/saveJsonToDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await saveJsonToDb();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving JSON to DB:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save JSON to DB" },
      { status: 500 },
    );
  }
}
