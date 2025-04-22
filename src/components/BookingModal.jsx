import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const BookingModal = ({ doctor, isOpen, onClose, onConfirm }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);

      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      setError("Please select a time slot");
      return;
    }
    onConfirm(selectedTime);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50 sm:p-0"
      onClick={onClose}
      role="dialog"
      aria-labelledby="booking-modal-title"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md p-6 m-4 transition-all transform bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="absolute p-2 text-gray-400 rounded-full top-3 right-3 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        <h2
          id="booking-modal-title"
          className="mb-4 text-2xl font-semibold text-gray-800"
        >
          Book Appointment with {doctor.name}
        </h2>

        <form onSubmit={handleSubmit} data-testid="booking-form">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="time-slot"
                className="block text-sm font-medium text-gray-700"
              >
                Select Time Slot
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <select
              id="time-slot"
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                setError("");
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-describedby={error ? "time-slot-error" : undefined}
              aria-invalid={error ? "true" : "false"}
              required
            >
              <option value="">Choose a time</option>
              {doctor.timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {error && (
              <div id="time-slot-error" className="sr-only">
                {error}
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedTime}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
