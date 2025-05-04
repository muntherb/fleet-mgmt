import { Maintenance } from "@/types";
import { StateCreator } from "zustand";
import { BasicInfoSlice } from "./basicInfoSlice";
import { LocationStatusSlice } from "./locationStatusSlice";
import { VehiclesSlice } from "./vehiclesSlice";
import { fetchMaintenance } from "@/services/maintenanceService";

export interface MaintenanceSlice {
  maintenance: Maintenance[];
  loading: boolean;
  error: string | null;
  addMaintenance: (maintenance: Maintenance) => void;
  fetchMaintenance: () => Promise<void>;
}

export const createMaintenanceSlice: StateCreator<
  VehiclesSlice & BasicInfoSlice & MaintenanceSlice & LocationStatusSlice,
  [["zustand/devtools", never]],
  [],
  MaintenanceSlice
> = (set) => ({
  maintenance: [],
  loading: false,
  error: null,
  fetchMaintenance: async () => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const maintenance = await fetchMaintenance();
      set((state) => ({ ...state, maintenance, loading: false }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch maintenance records. Please try again later.",
      }));
    }
  },
  addMaintenance: (maintenance) =>
    set((state) => ({
      maintenance: [...state.maintenance, maintenance],
    })),
});
