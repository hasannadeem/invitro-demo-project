import React, { useState } from 'react';

const BookingModal = ({ doctor, isOpen, onClose, onConfirm }) => {
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-labelledby="booking-modal-title"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <h2
          id="booking-modal-title"
          className="text-2xl font-semibold text-gray-800 mb-4"
        >
          Book Appointment with {doctor.name}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="time-slot"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Time Slot
          </label>
          <select
            id="time-slot"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md
                       shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choose a time</option>
            {doctor.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700
                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedTime)}
            disabled={!selectedTime}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300
                       disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
