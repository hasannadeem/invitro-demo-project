import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingModal from '../BookingModal';

describe('BookingModal', () => {
  const mockDoctor = {
    name: "Dr. Sarah Wilson",
    timeSlots: ["09:00 AM", "10:00 AM"]
  };

  const mockProps = {
    doctor: mockDoctor,
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(<BookingModal {...mockProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(`Book Appointment with ${mockDoctor.name}`)).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(<BookingModal {...mockProps} isOpen={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('displays all time slots', () => {
    render(<BookingModal {...mockProps} />);

    mockDoctor.timeSlots.forEach(slot => {
      expect(screen.getByText(slot)).toBeInTheDocument();
    });
  });

  test('confirm button is disabled when no time slot is selected', () => {
    render(<BookingModal {...mockProps} />);

    const confirmButton = screen.getByRole('button', { name: /confirm booking/i });
    expect(confirmButton).toBeDisabled();
  });

  test('calls onConfirm with selected time when confirm button is clicked', () => {
    render(<BookingModal {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/select time slot/i), {
      target: { value: "09:00 AM" }
    });

    const confirmButton = screen.getByRole('button', { name: /confirm booking/i });
    fireEvent.click(confirmButton);
    expect(mockProps.onConfirm).toHaveBeenCalledWith("09:00 AM");
  });

  test('calls onClose when cancel button is clicked', () => {
    render(<BookingModal {...mockProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test('has proper accessibility attributes', () => {
    render(<BookingModal {...mockProps} />);

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'booking-modal-title');
  });

  test('enables confirm button after selecting a time slot', () => {
    render(<BookingModal {...mockProps} />);

    const confirmButton = screen.getByRole('button', { name: /confirm booking/i });
    expect(confirmButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/select time slot/i), {
      target: { value: "09:00 AM" }
    });

    expect(confirmButton).toBeEnabled();
  });
});
