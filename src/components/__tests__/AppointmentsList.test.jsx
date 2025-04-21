import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentsList from '../AppointmentsList';

describe('AppointmentsList', () => {
  const mockAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      location: "New York Medical Center",
      date: "2024-01-01",
      time: "09:00 AM"
    },
    {
      id: 2,
      doctorName: "Dr. James Chen",
      specialty: "Dermatologist",
      location: "Downtown Clinic",
      date: "2024-01-02",
      time: "10:00 AM"
    }
  ];

  test('renders empty state when no appointments', () => {
    render(<AppointmentsList appointments={[]} />);

    expect(screen.getByText(/no appointments scheduled/i)).toBeInTheDocument();
  });

  test('renders all appointments when provided', () => {
    render(<AppointmentsList appointments={mockAppointments} />);

    mockAppointments.forEach(appointment => {
      expect(screen.getByText(appointment.doctorName)).toBeInTheDocument();
      expect(screen.getByText(appointment.specialty)).toBeInTheDocument();
      expect(screen.getByText(appointment.location)).toBeInTheDocument();
      expect(screen.getByText(appointment.time)).toBeInTheDocument();
    });
  });

  test('has proper accessibility attributes', () => {
    render(<AppointmentsList appointments={mockAppointments} />);

    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Your appointments');
    expect(screen.getAllByRole('listitem')).toHaveLength(mockAppointments.length);
  });
});
