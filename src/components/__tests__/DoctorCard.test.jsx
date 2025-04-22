import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DoctorCard from "../DoctorCard";

const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Wilson",
  photo: "https://randomuser.me/api/portraits/women/68.jpg",
  specialty: "Cardiologist",
  rating: 4.8,
  availability: ["Monday", "Wednesday", "Friday"],
  availableToday: false,
  location: "New York Medical Center",
  bio: "Specialized in cardiovascular health with over 10 years of experience",
  timeSlots: [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ],
};

describe("DoctorCard", () => {
  test("renders doctor information correctly", () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={() => {}} />);

    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.specialty)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.location)).toBeInTheDocument();
  });

  test("calls onBookAppointment when book button is clicked", () => {
    const mockOnBookAppointment = jest.fn();
    render(
      <DoctorCard
        doctor={mockDoctor}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    const bookButton = screen.getByRole("button", {
      name: /book appointment/i,
    });
    fireEvent.click(bookButton);

    expect(mockOnBookAppointment).toHaveBeenCalledWith(mockDoctor);
  });

  test("shows and hides details when details button is clicked", () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={() => {}} />);

    // Details should not be visible initially
    expect(screen.queryByText(mockDoctor.bio)).not.toBeInTheDocument();

    // Click show details button
    const detailsButton = screen.getByRole("button", { name: /show details/i });
    fireEvent.click(detailsButton);

    // Details should now be visible
    expect(screen.getByText(mockDoctor.bio)).toBeInTheDocument();

    // Button text should have changed
    expect(
      screen.getByRole("button", { name: /hide details/i })
    ).toBeInTheDocument();

    // Click hide details button again to test toggle functionality
    fireEvent.click(detailsButton);

    // Details should be hidden again
    expect(screen.queryByText(mockDoctor.bio)).not.toBeInTheDocument();
  });

  test("displays availability days correctly", () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={() => {}} />);

    mockDoctor.availability.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test("has proper ARIA attributes", () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={() => {}} />);

    // Check for proper ARIA role
    expect(screen.getByRole("article")).toBeInTheDocument();

    // Check for proper aria-label on the book button
    expect(
      screen.getByRole("button", {
        name: `Book appointment with ${mockDoctor.name}`,
      })
    ).toBeInTheDocument();

    // Check for aria-expanded on details button (initially false)
    const detailsButton = screen.getByRole("button", { name: /show details/i });
    expect(detailsButton).toHaveAttribute("aria-expanded", "false");
  });

  test("correctly shows 'Today' indicator for available days", () => {
    // Create a doctor object that is available today
    const doctorAvailableToday = {
      ...mockDoctor,
      availableToday: true,
    };

    // Mock the Date.toLocaleDateString to always return "Monday"
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn(() => "Monday");

    render(
      <DoctorCard doctor={doctorAvailableToday} onBookAppointment={() => {}} />
    );

    // Check for the "Today" indicator
    expect(screen.getByText("Monday (Today)")).toBeInTheDocument();

    // Restore the original implementation
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });

  test("renders proper HTML structure", () => {
    const { container } = render(
      <DoctorCard doctor={mockDoctor} onBookAppointment={() => {}} />
    );

    const image = screen.getByAltText(`Portrait of ${mockDoctor.name}`);
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute("loading", "lazy");
  });
});
