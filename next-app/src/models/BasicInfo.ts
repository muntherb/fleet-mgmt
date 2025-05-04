import { BasicInfo } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

const BasicInfoSchema: Schema = new Schema<BasicInfo>({
  id: { type: Number, required: true, unique: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true },
  licensePlate: { type: String, required: true },
  assignedDriver: { type: String, required: true },
  lastServiceDate: { type: String, required: true },
});

const BasicInfoModel: Model<BasicInfo> =
  mongoose.models.BasicInfo ||
  mongoose.model<BasicInfo>("BasicInfo", BasicInfoSchema);

export default BasicInfoModel;
