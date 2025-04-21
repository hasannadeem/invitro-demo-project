import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DoctorCard from '../DoctorCard';

describe('DoctorCard', () => {
  const mockDoctor = {
    id: 1,
    name: "Dr. Sarah Wilson",
    photo: "test-photo-url.jpg",
    specialty: "Cardiologist",
    rating: 4.8,
    availability: ["Monday", "Wednesday"],
    location: "New York Medical Center"
  };

  const mockOnBookAppointment = jest.fn();

  beforeEach(() => {
    mockOnBookAppointment.mockClear();
  });

  test('renders doctor information correctly', () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={mockOnBookAppointment} />);

    expect(screen.getByText(mockDoctor.name)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.specialty)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.location)).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  test('displays all availability days', () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={mockOnBookAppointment} />);

    mockDoctor.availability.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('calls onBookAppointment when book button is clicked', () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={mockOnBookAppointment} />);

    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));
    expect(mockOnBookAppointment).toHaveBeenCalledWith(mockDoctor);
  });

  test('has proper accessibility attributes', () => {
    render(<DoctorCard doctor={mockDoctor} onBookAppointment={mockOnBookAppointment} />);

    expect(screen.getByRole('article')).toHaveAttribute(
      'aria-label',
      `Doctor profile for ${mockDoctor.name}`
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockDoctor.name);
  });
});
