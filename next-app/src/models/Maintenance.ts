import { Maintenance } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

const MaintenanceRecordSchema: Schema = new Schema<Maintenance>({
  date: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String, required: true },
  cost: { type: Number, required: true },
});

const MaintenanceSchema: Schema = new Schema<Maintenance>({
  id: { type: Number, required: true, unique: true },
  maintenanceRecords: { type: [MaintenanceRecordSchema], required: true }, // Array of maintenance records
});

const MaintenanceModel: Model<Maintenance> =
  mongoose.models.Maintenance ||
  mongoose.model<Maintenance>("Maintenance", MaintenanceSchema);

export default MaintenanceModel;
