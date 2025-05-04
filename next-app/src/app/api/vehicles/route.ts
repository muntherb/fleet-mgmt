import { NextResponse } from "next/server";
import Vehicle from "@/models/Vehicle";
import dbConnect from "@/lib/dbConnect";
import { vehiclesSchema } from "@/schemas";
import { ZodError } from "zod";

export async function GET() {
  await dbConnect();

  try {
    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles, { status: 200 });
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

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const parsedSchema = vehiclesSchema.parse(body);
    const { id, model, type, status } = parsedSchema;
    const existingVehicle = await Vehicle.findOne({ id });
    if (existingVehicle) {
      return NextResponse.json(
        { error: `Vehicle with id ${id} already exists` },
        { status: 400 },
      );
    }

    const newVehicle = new Vehicle({ id, model, type, status });
    await newVehicle.save();

    return NextResponse.json(newVehicle, { status: 201 });
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
