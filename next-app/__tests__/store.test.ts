import { useBoundStore } from "@/store";
import { act } from "@testing-library/react";

beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("useBoundStore", () => {
  beforeEach(() => {
    act(() => {
      useBoundStore.setState({
        vehicles: [],
        basicInfo: [],
        maintenance: [],
        locationStatus: [],
        loading: false,
        error: null,
      });
    });
  });

  it("should add a vehicle and update all slices", async () => {
    const vehicle = {
      id: 1,
      model: "Model X",
      type: "Truck",
      status: "Active",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(vehicle),
    });

    await act(async () => {
      await useBoundStore.getState().addBoundVehicle(vehicle);
    });

    const state = useBoundStore.getState();

    expect(state.vehicles).toContainEqual(vehicle);

    expect(state.basicInfo).toContainEqual(
      expect.objectContaining({
        id: vehicle.id,
        model: vehicle.model,
        type: vehicle.type,
        status: vehicle.status,
      }),
    );

    expect(state.maintenance).toContainEqual(
      expect.objectContaining({
        id: vehicle.id,
        type: "Oil Change",
        status: "completed",
      }),
    );

    expect(state.locationStatus).toContainEqual(
      expect.objectContaining({
        id: vehicle.id,
        city: "Dubai",
        country: "UAE",
        status: "inactive",
      }),
    );
  });

  it("should handle fetchVehicles and update the state", async () => {
    const mockVehicles = [
      { id: 1, model: "Model 1", type: "Truck", status: "Active" },
      { id: 2, model: "Model 2", type: "SUV", status: "Inactive" },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockVehicles),
    });

    await act(async () => {
      await useBoundStore.getState().fetchVehicles();
    });

    const state = useBoundStore.getState();

    expect(state.vehicles).toEqual(mockVehicles);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle fetchVehicles error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch vehicles"),
    );

    await act(async () => {
      await useBoundStore.getState().fetchVehicles();
    });

    const state = useBoundStore.getState();

    expect(state.vehicles).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch vehicles");
  });
});
