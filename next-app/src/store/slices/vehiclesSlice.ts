import { Vehicle } from "@/types";
import { StateCreator } from "zustand";
import { BasicInfoSlice } from "./basicInfoSlice";
import { LocationStatusSlice } from "./locationStatusSlice";
import { MaintenanceSlice } from "./maintenanceSlice";
import { addVehicleService, fetchVehicles } from "@/services/vehiclesService";

export interface VehiclesSlice {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  addVehicle: (vehicle: Vehicle) => Promise<Vehicle | void>;
  fetchVehicles: () => Promise<void>;
}

export const createVehiclesSlice: StateCreator<
  VehiclesSlice & BasicInfoSlice & MaintenanceSlice & LocationStatusSlice,
  [["zustand/devtools", never]],
  [],
  VehiclesSlice
> = (set, get) => ({
  vehicles: [],
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const vehicles = await fetchVehicles();
      set((state) => ({ ...state, vehicles, loading: false }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch vehicles. Please try again later.",
        loading: false,
      });
    }
  },
  addVehicle: async (vehicle) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const res = await addVehicleService(vehicle);
      if (res.error) {
        set((state) => ({
          ...state,
          loading: false,
          error: res.error ?? "Failed to add vehicle",
        }));
        throw new Error(res.error ?? "Failed to add vehicle");
      }
      set((state) => ({
        ...state,
        vehicles: [...state.vehicles, vehicle],
        loading: false,
      }));
      return res;
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to add vehicle. Please try again later.",
      }));
      console.log({ loading: get().loading, error: get().error });
    }
  },
});
