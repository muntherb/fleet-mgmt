import { NextResponse } from "next/server";
import Maintenance from "@/models/Maintenance";
import dbConnect from "@/lib/dbConnect";
import { singleMaintenanceSchema } from "@/schemas";
import { ZodError } from "zod";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const parsedSchema = singleMaintenanceSchema.parse(body);
    const { id, date, type, status, notes, cost } = parsedSchema;

    let maintenance = await Maintenance.findOne({ id });
    if (!maintenance) {
      maintenance = new Maintenance({ id, maintenanceRecords: [] });
    }

    maintenance.maintenanceRecords.push({ date, type, status, notes, cost });
    await maintenance.save();

    return NextResponse.json(maintenance, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        return NextResponse.json(
          { error: "Validation failed", details: (error as ZodError).issues },
          { status: 400 },
        );
      }

      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
