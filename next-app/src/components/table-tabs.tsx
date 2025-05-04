"use client";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./data-table";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { useBoundStore } from "@/store";
import { Skeleton } from "./ui/skeleton";
import React from "react";
import { toast } from "sonner";
import {
  vehiclesColumns,
  basicInfoColumns,
  maintenanceColumns,
  locationStatusColumns,
} from "./table-columns";
import { Button } from "./ui/button";
import { uploadMockData } from "@/services/uploadMockService";

export function TableTabs() {
  const vehicles = useBoundStore((state) => state.vehicles);
  const basicInfo = useBoundStore((state) => state.basicInfo);
  const maintenance = useBoundStore((state) => state.maintenance);
  const locationStatus = useBoundStore((state) => state.locationStatus);
  const fetchMaintenance = useBoundStore((state) => state.fetchMaintenance);
  const fetchVehicles = useBoundStore((state) => state.fetchVehicles);
  const fetchLocationStatus = useBoundStore(
    (state) => state.fetchLocationStatus,
  );
  const fetchBasicInfo = useBoundStore((state) => state.fetchBasicInfo);
  const loading = useBoundStore((state) => state.loading);
  React.useEffect(() => {
    fetchVehicles();
    fetchMaintenance();
    fetchLocationStatus();
    fetchBasicInfo();
  }, [fetchVehicles, fetchMaintenance, fetchLocationStatus, fetchBasicInfo]);
  if (!vehicles || !basicInfo || !maintenance || !locationStatus) {
    return (
      <div className="w-full h-full flex flex-col space-y-4">
        <Skeleton className="h-4 w-full rounded-xl m-3 lg:m-6" />
        <Skeleton className="h-96 w-full rounded-xl m-3 lg:m-6" />
      </div>
    );
  }
  if (loading) {
    toast.loading("Fetching data...");
  } else {
    toast.dismiss();
  }
  return (
    <Tabs
      defaultValue="vehicles"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="vehicles">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            <SelectItem value="basic-info">Basic info</SelectItem>
            <SelectItem value="maintenance-history">
              Maintenance history
            </SelectItem>
            <SelectItem value="location-status">Location/status</SelectItem>
            <SelectItem value="analytics">Usage analytics</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="basic-info">Basic info</TabsTrigger>
          <TabsTrigger value="maintenance-history">
            Maintenance history
          </TabsTrigger>
          <TabsTrigger value="location-status">Location/status</TabsTrigger>
          <TabsTrigger value="analytics">Usage analytics</TabsTrigger>
        </TabsList>
        <Button
          className="cursor-pointer"
          onClick={async () => {
            toast.loading("Uploading mock data...");
            await uploadMockData();
            toast.dismiss();
            toast.success("Mock data uploaded successfully");
          }}
        >
          Upload mock data to DB
        </Button>
      </div>
      <TabsContent
        value="vehicles"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {loading ? (
          <Skeleton className="h-96 w-full rounded-xl m-3 lg:m  -6" />
        ) : (
          <DataTable
            data={vehicles}
            columns={vehiclesColumns}
            key={"vehicles"}
          />
        )}
      </TabsContent>
      <TabsContent value="basic-info" className="flex flex-col px-4 lg:px-6">
        <DataTable
          data={basicInfo}
          columns={basicInfoColumns}
          key="basic-info"
        />
      </TabsContent>
      <TabsContent
        value="maintenance-history"
        className="flex flex-col px-4 lg:px-6"
      >
        <DataTable
          data={maintenance}
          columns={maintenanceColumns}
          key="maintenance-history"
        />
      </TabsContent>
      <TabsContent
        value="location-status"
        className="flex flex-col px-4 lg:px-6"
      >
        <DataTable
          data={locationStatus}
          columns={locationStatusColumns}
          key="location-status"
        />
      </TabsContent>
      <TabsContent value="analytics" className="flex flex-col px-4 lg:px-6">
        <ChartAreaInteractive />
      </TabsContent>
    </Tabs>
  );
}
