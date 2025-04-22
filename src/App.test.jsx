import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./components/BookingModal", () => {
  return function MockBookingModal() {
    // Return an empty div to simplify testing
    return null;
  };
});

describe("App", () => {
  beforeEach(() => {
    // Using jest.fn() for any mocks needed instead of direct node manipulation
    jest.clearAllMocks();
  });

  test("renders main heading", () => {
    render(<App />);
    expect(
      screen.getByText(/book your doctor appointment/i)
    ).toBeInTheDocument();
  });

  test("filters doctors by specialty", () => {
    render(<App />);

    // Use id selector instead of label text
    const specialtyFilter = screen.getByRole("combobox", {
      name: /filter by medical specialty/i,
    });
    fireEvent.change(specialtyFilter, { target: { value: "Cardiologist" } });

    const doctorCards = screen.getAllByRole("article");
    doctorCards.forEach((card) => {
      expect(card).toHaveTextContent("Cardiologist");
    });
  });

  test("filters doctors by availability", () => {
    render(<App />);

    // Use id selector instead of label text
    const availabilityFilter = screen.getByRole("combobox", {
      name: /filter by availability/i,
    });
    fireEvent.change(availabilityFilter, { target: { value: "Monday" } });

    const resultsSummary = screen.getByText(/found/i);
    expect(resultsSummary).toBeInTheDocument();
  });

  test("filters doctors by availability with Today filter", () => {
    render(<App />);

    const todayButton = screen.getByRole("button", {
      name: /available today/i,
    });
    fireEvent.click(todayButton);

    // Get the status by aria-live attribute instead of role
    const resultsSummary = screen.getByText(/found/i);
    expect(resultsSummary).toHaveTextContent(/Today/i);
  });

  test("shows no results message when no doctors match filters", () => {
    render(<App />);

    // Apply filters that won't match any doctors
    const specialtyFilter = screen.getByRole("combobox", {
      name: /filter by medical specialty/i,
    });
    fireEvent.change(specialtyFilter, { target: { value: "Cardiologist" } });

    const availabilityFilter = screen.getByRole("combobox", {
      name: /filter by availability/i,
    });
    fireEvent.change(availabilityFilter, { target: { value: "Sunday" } });

    expect(screen.getByText(/no doctors available/i)).toBeInTheDocument();
  });

  test("using multiple filter combinations works correctly", () => {
    render(<App />);

    // First filter by specialty
    const specialtyFilter = screen.getByRole("combobox", {
      name: /filter by medical specialty/i,
    });
    fireEvent.change(specialtyFilter, { target: { value: "Cardiologist" } });

    // Then filter by day
    const availabilityFilter = screen.getByRole("combobox", {
      name: /filter by availability/i,
    });
    fireEvent.change(availabilityFilter, { target: { value: "Monday" } });

    // Check results text has both filters
    const resultsSummary = screen.getByText(/found/i);
    expect(resultsSummary).toHaveTextContent(/cardiologist/i);
    expect(resultsSummary).toHaveTextContent(/monday/i);

    // Clear filters
    const clearButton = screen.getByRole("button", { name: /clear all/i });
    fireEvent.click(clearButton);

    // Should show all doctors again
    const updatedSummary = screen.getByText(/found/i);
    expect(updatedSummary).toHaveTextContent(/found \d+ doctors/i);
  });

  test("specialty filter works as intended", () => {
    render(<App />);

    // Change specialty filter
    const specialtyFilter = screen.getByRole("combobox", {
      name: /filter by medical specialty/i,
    });

    // Test each specialty
    ["Cardiologist", "Dermatologist", "Pediatrician"].forEach((specialty) => {
      fireEvent.change(specialtyFilter, { target: { value: specialty } });
      // Use getByText instead of getByRole to avoid multiple status elements
      const statusText = screen.getByText(/found/i);
      expect(statusText).toHaveTextContent(specialty);
    });

    // Reset to All
    fireEvent.change(specialtyFilter, { target: { value: "All" } });
    expect(screen.queryByText(/specializing in/i)).not.toBeInTheDocument();
  });
});
