import { BasicInfo } from "@/types";
import { StateCreator } from "zustand";
import { VehiclesSlice } from "./vehiclesSlice";
import { MaintenanceSlice } from "./maintenanceSlice";
import { LocationStatusSlice } from "./locationStatusSlice";
import basicInfoData from "@/data/basic_info.json";

export interface BasicInfoSlice {
  basicInfo: BasicInfo[];
  addBasicInfo: (info: BasicInfo) => void;
  fetchBasicInfo: () => Promise<void>;
}

export const createBasicInfoSlice: StateCreator<
  VehiclesSlice & BasicInfoSlice & MaintenanceSlice & LocationStatusSlice,
  [["zustand/devtools", never]],
  [],
  BasicInfoSlice
> = (set) => ({
  basicInfo: [],
  addBasicInfo: (info) =>
    set((state) => ({
      basicInfo: [...state.basicInfo, info],
    })),
  fetchBasicInfo: async () => {
    try {
      const basicInfo = basicInfoData;
      set((state) => ({ ...state, basicInfo }));
    } catch (error) {
      console.error("Failed to fetch basic info data", error);
    }
  },
});
