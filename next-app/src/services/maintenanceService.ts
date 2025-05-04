import { Maintenance } from "@/types";

const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` || "http://localhost:3000/api";

export const fetchMaintenance = async () => {
  const response = await fetch(`${API_BASE_URL}/maintenance/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch maintenance history");
  }

  return await response.json();
};

export const fetchMaintenanceById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/maintenance/history?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch maintenance record");
  }

  return await response.json();
};

export const addMaintenanceService = async (maintenance: Maintenance) => {
  const response = await fetch(`${API_BASE_URL}/maintenance/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenance),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to add maintenance record");
  }

  const jsonRes = await response.json();
  return jsonRes;
};
