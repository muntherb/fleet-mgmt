import { Vehicle } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

const VehicleSchema: Schema = new Schema<Vehicle>({
  id: { type: Number, required: true, unique: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const VehicleModel: Model<Vehicle> =
  mongoose.models.Vehicle || mongoose.model<Vehicle>("Vehicle", VehicleSchema);

export default VehicleModel;
