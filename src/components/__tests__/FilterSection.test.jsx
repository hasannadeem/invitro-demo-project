import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSection from '../FilterSection';

describe('FilterSection', () => {
  const mockProps = {
    specialties: ['All', 'Cardiologist', 'Dermatologist'],
    selectedSpecialty: 'All',
    onSpecialtyChange: jest.fn(),
    availableDays: ['Monday', 'Tuesday'],
    selectedDay: 'All',
    onDayChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both specialty and availability filters', () => {
    render(<FilterSection {...mockProps} />);

    expect(screen.getByLabelText(/filter by specialty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by availability/i)).toBeInTheDocument();
  });

  test('specialty filter shows all options', () => {
    render(<FilterSection {...mockProps} />);

    const specialtySelect = screen.getByLabelText(/filter by specialty/i);
    mockProps.specialties.forEach(specialty => {
      expect(specialtySelect).toHaveTextContent(specialty);
    });
  });

  test('availability filter shows all days', () => {
    render(<FilterSection {...mockProps} />);

    const availabilitySelect = screen.getByLabelText(/filter by availability/i);
    expect(availabilitySelect).toHaveTextContent('Any Day');
    mockProps.availableDays.forEach(day => {
      expect(availabilitySelect).toHaveTextContent(day);
    });
  });

  test('calls onSpecialtyChange when specialty is selected', () => {
    render(<FilterSection {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/filter by specialty/i), {
      target: { value: 'Cardiologist' },
    });

    expect(mockProps.onSpecialtyChange).toHaveBeenCalledWith('Cardiologist');
  });

  test('calls onDayChange when availability is selected', () => {
    render(<FilterSection {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/filter by availability/i), {
      target: { value: 'Monday' },
    });

    expect(mockProps.onDayChange).toHaveBeenCalledWith('Monday');
  });

  test('clear filters button resets both filters', () => {
    render(<FilterSection {...mockProps} />);

    fireEvent.click(screen.getByText(/clear filters/i));

    expect(mockProps.onSpecialtyChange).toHaveBeenCalledWith('All');
    expect(mockProps.onDayChange).toHaveBeenCalledWith('All');
  });
});
