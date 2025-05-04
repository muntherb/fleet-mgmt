import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { createVehiclesSlice, VehiclesSlice } from "./slices/vehiclesSlice";
import { BasicInfoSlice, createBasicInfoSlice } from "./slices/basicInfoSlice";
import {
  createMaintenanceSlice,
  MaintenanceSlice,
} from "./slices/maintenanceSlice";
import {
  createLocationStatusSlice,
  LocationStatusSlice,
} from "./slices/locationStatusSlice";
import { Vehicle } from "@/types";

const DEFAULT_BASIC_INFO = {
  year: 2010,
  vin: "",
  licensePlate: "",
  assignedDriver: "Assigned Driver",
  lastServiceDate: "",
};

const DEFAULT_MAINTENANCE = {
  maintenanceRecords: [
    {
      date: "2022-02-11",
      type: "Oil Change",
      status: "completed",
      notes: "Routine check and service",
      cost: 210,
    },
  ],
};

const DEFAULT_LOCATION_STATUS = {
  city: "Dubai",
  country: "UAE",
  status: "inactive",
  lastUpdated: new Date().toISOString(),
  speed: 0,
  heading: "",
};

interface VehicleSlice {
  addBoundVehicle: (vehicle: Vehicle) => Promise<void>;
}

export const createVehicle: StateCreator<
  VehiclesSlice & BasicInfoSlice & MaintenanceSlice & LocationStatusSlice,
  [["zustand/devtools", never]],
  [],
  VehicleSlice
> = (set, get) => ({
  addBoundVehicle: async (vehicle) => {
    await get().addVehicle(vehicle);

    get().addBasicInfo({
      id: vehicle.id,
      model: vehicle.model,
      type: vehicle.type,
      status: vehicle.status,
      ...DEFAULT_BASIC_INFO,
    });

    get().addMaintenance({
      id: vehicle.id,
      ...DEFAULT_MAINTENANCE.maintenanceRecords[0],
      ...DEFAULT_MAINTENANCE,
    });

    get().addLocationStatus({
      id: vehicle.id,
      ...DEFAULT_LOCATION_STATUS,
    });
  },
});

export const useBoundStore = create<
  VehiclesSlice &
    BasicInfoSlice &
    MaintenanceSlice &
    LocationStatusSlice &
    VehicleSlice
>()(
  devtools((...rest) => ({
    ...createVehiclesSlice(...rest),
    ...createBasicInfoSlice(...rest),
    ...createMaintenanceSlice(...rest),
    ...createLocationStatusSlice(...rest),
    ...createVehicle(...rest),
  })),
);
