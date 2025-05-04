import { VehicleForm } from "@/components/vehicle-form";
import { render, screen, fireEvent } from "@testing-library/react";
import { useBoundStore } from "@/store";

const mockAddVehicle = jest.fn();

jest.mock("@/store", () => ({
  useBoundStore: jest.fn((selector) =>
    selector({
      addVehicle: mockAddVehicle,
      loading: false,
      error: null,
    }),
  ),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("VehicleForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBoundStore as unknown as jest.Mock).mockReturnValue({
      addVehicle: mockAddVehicle,
      loading: false,
      error: null,
    });

    render(<VehicleForm />);
    fireEvent.click(screen.getByRole("button", { name: /Add Vehicle/i }));
  });

  it("renders the form correctly", () => {
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it("validates form fields", async () => {
    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      await screen.findByText(/Model must be at least 2 characters/i),
    ).toBeInTheDocument();
  });
});
