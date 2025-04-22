import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import BookingModal from "../BookingModal";

describe("BookingModal", () => {
  const mockDoctor = {
    name: "Dr. Sarah Wilson",
    timeSlots: ["09:00 AM", "10:00 AM"],
  };

  const mockProps = {
    doctor: mockDoctor,
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders modal when isOpen is true", () => {
    render(<BookingModal {...mockProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(`Book Appointment with ${mockDoctor.name}`)
    ).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    render(<BookingModal {...mockProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("displays all time slots", () => {
    render(<BookingModal {...mockProps} />);

    mockDoctor.timeSlots.forEach((slot) => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });
  });

  test("confirm button is disabled when no time slot is selected", () => {
    render(<BookingModal {...mockProps} />);

    const confirmButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test("calls onConfirm with selected time when confirm button is clicked", () => {
    render(<BookingModal {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/select time slot/i), {
      target: { value: "09:00 AM" },
    });

    const confirmButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    fireEvent.click(confirmButton);
    expect(mockProps.onConfirm).toHaveBeenCalledWith("09:00 AM");
  });

  test("calls onClose when cancel button is clicked", () => {
    render(<BookingModal {...mockProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("has proper accessibility attributes", () => {
    render(<BookingModal {...mockProps} />);

    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      "booking-modal-title"
    );
  });

  test("enables confirm button after selecting a time slot", () => {
    render(<BookingModal {...mockProps} />);

    const confirmButton = screen.getByRole("button", {
      name: /confirm booking/i,
    });
    expect(confirmButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/select time slot/i), {
      target: { value: "09:00 AM" },
    });

    expect(confirmButton).toBeEnabled();
  });

  test("shows error message when trying to submit without selecting a time slot", () => {
    render(<BookingModal {...mockProps} />);

    // Find and submit the form
    const form = screen.getByTestId("booking-form");
    fireEvent.submit(form);

    // Check for error message - using getAllByText since there might be multiple elements with the same text
    const errorMessages = screen.getAllByText(/please select a time slot/i);
    expect(errorMessages.length).toBeGreaterThan(0);
    expect(errorMessages[0]).toBeInTheDocument();
  });

  test("focuses close button when modal opens", () => {
    render(<BookingModal {...mockProps} />);

    // Advance timers to trigger the focus
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Check if close button is focused using Testing Library methods
    const closeButton = screen.getByLabelText(/close modal/i);
    expect(closeButton).toHaveFocus();
  });

  test("closes modal on ESC key press", () => {
    render(<BookingModal {...mockProps} />);

    // Simulate ESC key press on the modal dialog
    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

    // Check if onClose was called
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("clicking backdrop closes modal but clicking modal content does not", () => {
    // This test verifies that clicks inside the modal don't bubble up to the backdrop
    // which is the behavior we want from stopPropagation

    render(<BookingModal {...mockProps} />);

    // First, reset any calls to onClose
    mockProps.onClose.mockClear();

    // Find the modal content (the form inside the dialog)
    const form = screen.getByTestId("booking-form");

    // Click on the form - this should not propagate to the backdrop
    fireEvent.click(form);

    // onClose should not have been called
    expect(mockProps.onClose).not.toHaveBeenCalled();

    // Click on the dialog (backdrop) - this should call onClose
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
