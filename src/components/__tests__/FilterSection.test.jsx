import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilterSection from "../FilterSection";

describe("FilterSection", () => {
  const mockProps = {
    specialties: ["All", "Cardiologist", "Dermatologist"],
    selectedSpecialty: "All",
    onSpecialtyChange: jest.fn(),
    availableDays: ["Monday", "Tuesday"],
    selectedDay: "All",
    onDayChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders both specialty and availability filters", () => {
    render(<FilterSection {...mockProps} />);

    expect(screen.getByLabelText(/specialty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/availability/i)).toBeInTheDocument();
  });

  test("specialty filter shows all options", () => {
    render(<FilterSection {...mockProps} />);

    const specialtySelect = screen.getByLabelText(/specialty/i);
    mockProps.specialties.forEach((specialty) => {
      expect(specialtySelect).toHaveTextContent(specialty);
    });
  });

  test("availability filter shows all days", () => {
    render(<FilterSection {...mockProps} />);

    const availabilitySelect = screen.getByLabelText(/availability/i);
    expect(availabilitySelect).toHaveTextContent("Any Day");
    mockProps.availableDays.forEach((day) => {
      expect(availabilitySelect).toHaveTextContent(day);
    });
  });

  test("calls onSpecialtyChange when specialty is selected", () => {
    render(<FilterSection {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/specialty/i), {
      target: { value: "Cardiologist" },
    });

    expect(mockProps.onSpecialtyChange).toHaveBeenCalledWith("Cardiologist");
  });

  test("calls onDayChange when availability is selected", () => {
    render(<FilterSection {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/availability/i), {
      target: { value: "Monday" },
    });

    expect(mockProps.onDayChange).toHaveBeenCalledWith("Monday");
  });

  test("clear filters button is shown when filters are active and resets filters", () => {
    // Render with active filters
    const propsWithActiveFilters = {
      ...mockProps,
      selectedSpecialty: "Cardiologist",
      selectedDay: "Monday",
    };

    render(<FilterSection {...propsWithActiveFilters} />);

    // Verify clear button exists
    const clearButton = screen.getByRole("button", { name: /clear all/i });
    expect(clearButton).toBeInTheDocument();

    // Click clear button
    fireEvent.click(clearButton);

    // Verify handlers called to reset filters
    expect(mockProps.onSpecialtyChange).toHaveBeenCalledWith("All");
    expect(mockProps.onDayChange).toHaveBeenCalledWith("All");
  });

  test("clear button is not shown when no filters are active", () => {
    render(<FilterSection {...mockProps} />);

    // Clear button should not be present when filters are at default values
    expect(
      screen.queryByRole("button", { name: /clear all/i })
    ).not.toBeInTheDocument();
  });

  test("Available Today button sets the day filter to Today", () => {
    render(<FilterSection {...mockProps} />);

    const todayButton = screen.getByRole("button", {
      name: /available today/i,
    });
    fireEvent.click(todayButton);

    expect(mockProps.onDayChange).toHaveBeenCalledWith("Today");
  });

  test("Available Today button has aria-pressed attribute", () => {
    // Test with Today selected
    const propsWithTodaySelected = {
      ...mockProps,
      selectedDay: "Today",
    };

    render(<FilterSection {...propsWithTodaySelected} />);

    const todayButton = screen.getByRole("button", {
      name: /available today/i,
    });
    expect(todayButton).toHaveAttribute("aria-pressed", "true");

    // Cleanup and re-render with different day selected
    cleanup();
    render(<FilterSection {...mockProps} />);

    const todayButtonNotPressed = screen.getByRole("button", {
      name: /available today/i,
    });
    expect(todayButtonNotPressed).toHaveAttribute("aria-pressed", "false");
  });
});
