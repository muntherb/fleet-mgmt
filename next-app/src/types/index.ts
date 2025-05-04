import {
  basicInfoSchema,
  maintenanceSchema,
  locationStatusSchema,
  vehiclesSchema,
} from "@/schemas";
import { z } from "zod";

export type Vehicle = z.infer<typeof vehiclesSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type Maintenance = z.infer<typeof maintenanceSchema>;
export type LocationStatus = z.infer<typeof locationStatusSchema>;
