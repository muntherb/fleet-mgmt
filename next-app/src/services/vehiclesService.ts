import { Vehicle } from "@/types";

const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` || "http://localhost:3000/api";

export const fetchVehicles = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return await response.json();
};

export const fetchVehicleById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle");
  }

  return await response.json();
};

export const addVehicleService = async (vehicle: Vehicle) => {
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to add vehicle");
  }
  const jsonRes = await response.json();
  return jsonRes;
};
