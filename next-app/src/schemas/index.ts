import { z } from "zod";

export const vehiclesSchema = z.object({
  id: z.number(),
  model: z.string(),
  type: z.string(),
  status: z.string(),
});

export const basicInfoSchema = z.object({
  id: z.number(),
  model: z.string(),
  type: z.string(),
  status: z.string(),
  year: z.number(),
  vin: z.string(),
  licensePlate: z.string(),
  assignedDriver: z.string(),
  lastServiceDate: z.string(),
});

export const singleMaintenanceSchema = z.object({
  id: z.number().optional(),
  date: z.string(),
  type: z.string(),
  status: z.string(),
  notes: z.string(),
  cost: z.union([z.string(), z.number()]),
});

export const maintenanceSchema = z.object({
  id: z.number(),
  date: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
  cost: z.union([z.string(), z.number()]).optional(),
  maintenanceRecords: z.array(singleMaintenanceSchema),
});

export const locationStatusSchema = z.object({
  id: z.number(),
  country: z.string(),
  city: z.string(),
  status: z.string(),
  lastUpdated: z.string(),
  speed: z.number(),
  heading: z.string(),
});
