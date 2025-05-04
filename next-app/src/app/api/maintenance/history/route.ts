import { NextResponse } from "next/server";
import Maintenance from "@/models/Maintenance";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      const history = await Maintenance.find({});
      return NextResponse.json(history, { status: 200 });
    }
    const maintenance = await Maintenance.findOne({ id: Number(id) });

    if (!maintenance) {
      return NextResponse.json(
        { error: "No maintenance history found for this vehicle" },
        { status: 404 },
      );
    }

    return NextResponse.json(maintenance.maintenanceRecords, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
