const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` || "http://localhost:3000/api";

export const uploadMockData = async () => {
  const response = await fetch(`${API_BASE_URL}/upload-mock`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload mock data");
  }

  return await response.json();
};
