import { LocationStatus } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

const LocationStatusSchema: Schema = new Schema<LocationStatus>({
  id: { type: Number, required: true, unique: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  speed: { type: Number, required: true },
  heading: { type: String, required: true },
});

const LocationStatusModel: Model<LocationStatus> =
  mongoose.models.LocationStatus ||
  mongoose.model<LocationStatus>("LocationStatus", LocationStatusSchema);

export default LocationStatusModel;
