import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders main heading', () => {
    render(<App />);
    expect(screen.getByText(/book your doctor appointment/i)).toBeInTheDocument();
  });

  test('filters doctors by specialty', () => {
    render(<App />);

    const specialtyFilter = screen.getByLabelText(/filter by specialty/i);
    fireEvent.change(specialtyFilter, { target: { value: 'Cardiologist' } });

    const doctorCards = screen.getAllByRole('article');
    doctorCards.forEach(card => {
      expect(card).toHaveTextContent('Cardiologist');
    });
  });

  test('filters doctors by availability', () => {
    render(<App />);

    const availabilityFilter = screen.getByLabelText(/filter by availability/i);
    fireEvent.change(availabilityFilter, { target: { value: 'Monday' } });

    const resultsSummary = screen.getByText(/found/i);
    expect(resultsSummary).toBeInTheDocument();
  });

  test('opens booking modal when book button is clicked', () => {
    render(<App />);

    const firstBookButton = screen.getAllByText(/book appointment/i)[0];
    fireEvent.click(firstBookButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('adds new appointment when booking is confirmed', async () => {
    render(<App />);

    const bookButton = screen.getAllByText(/book appointment/i)[0];
    fireEvent.click(bookButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const timeSelect = screen.getByLabelText(/select time slot/i);
    expect(timeSelect).toBeInTheDocument();
    fireEvent.change(timeSelect, { target: { value: '09:00 AM' } });

    const confirmButton = screen.getByRole('button', {
      name: /confirm( booking)?/i
    });
    expect(confirmButton).toBeEnabled();
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/no appointments scheduled/i)).not.toBeInTheDocument();
    expect(screen.getByRole('list', { name: /your appointments/i })).toBeInTheDocument();
  });

  test('shows no results message when no doctors match filters', () => {
    render(<App />);

    const specialtyFilter = screen.getByLabelText(/filter by specialty/i);
    fireEvent.change(specialtyFilter, { target: { value: 'Cardiologist' } });

    const availabilityFilter = screen.getByLabelText(/filter by availability/i);
    fireEvent.change(availabilityFilter, { target: { value: 'Sunday' } });

    expect(screen.getByText(/no doctors available/i)).toBeInTheDocument();
  });
});
