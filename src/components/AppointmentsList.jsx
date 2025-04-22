import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const AppointmentsList = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div
        className="py-8 text-center border border-gray-100 rounded-lg bg-gray-50"
        role="status"
        aria-label="No appointments found"
      >
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="mt-2 font-medium text-gray-600">
          No appointments scheduled
        </p>
        <p className="text-sm text-gray-500">
          Your booked appointments will appear here
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 overflow-hidden"
      role="list"
      aria-label="Your appointments"
    >
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="p-4 transition-shadow bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
          role="listitem"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                <UserIcon
                  className="w-5 h-5 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">
                  {appointment.doctorName}
                </h3>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon
                className="h-4 w-4 mr-1.5 text-gray-500"
                aria-hidden="true"
              />
              <span>{appointment.location}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center text-sm font-medium text-blue-600">
                <CalendarIcon className="h-4 w-4 mr-1.5" aria-hidden="true" />
                <span>{appointment.date}</span>
              </div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {appointment.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
