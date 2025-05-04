import { LocationStatus } from "@/types";
import { StateCreator } from "zustand";
import { BasicInfoSlice } from "./basicInfoSlice";
import { MaintenanceSlice } from "./maintenanceSlice";
import { VehiclesSlice } from "./vehiclesSlice";
import locationStatusData from "@/data/location_status.json";

export interface LocationStatusSlice {
  locationStatus: LocationStatus[];
  addLocationStatus: (status: LocationStatus) => void;
  fetchLocationStatus: () => Promise<void>;
}

export const createLocationStatusSlice: StateCreator<
  VehiclesSlice & BasicInfoSlice & MaintenanceSlice & LocationStatusSlice,
  [["zustand/devtools", never]],
  [],
  LocationStatusSlice
> = (set) => ({
  locationStatus: [],
  addLocationStatus: (status) =>
    set((state) => ({
      locationStatus: [...state.locationStatus, status],
    })),
  fetchLocationStatus: async () => {
    try {
      const locationStatus = locationStatusData;
      set((state) => ({ ...state, locationStatus }));
    } catch (error) {
      console.error("Failed to fetch location status data", error);
    }
  },
});
