import React, { useState } from "react";
import {
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className="flex flex-col p-6 transition-all duration-300 transform bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1"
      role="article"
      aria-label={`Doctor profile for ${doctor.name}`}
    >
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
        <img
          src={doctor.photo}
          alt={`Portrait of ${doctor.name}`}
          className="object-cover w-24 h-24 rounded-full"
          loading="lazy"
        />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center justify-center mt-1 sm:justify-start">
            <StarIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
            <span
              className="ml-1 text-gray-600"
              aria-label={`Rating: ${doctor.rating} out of 5`}
            >
              {doctor.rating}
            </span>
          </div>

          <div className="flex items-center justify-center mt-1 text-gray-600 sm:justify-start">
            <MapPinIcon
              className="w-4 h-4 mr-1 text-gray-500"
              aria-hidden="true"
            />
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={toggleDetails}
          className="flex items-center justify-center w-full text-sm text-blue-600 hover:text-blue-800 sm:justify-start sm:w-auto focus:outline-none focus:underline"
          aria-expanded={showDetails}
          aria-controls={`doctor-details-${doctor.id}`}
          data-testid={`details-button-${doctor.id}`}
        >
          <InformationCircleIcon className="w-4 h-4 mr-1" aria-hidden="true" />
          {showDetails ? "Hide details" : "Show details"}
        </button>

        {showDetails && (
          <div
            id={`doctor-details-${doctor.id}`}
            className="p-3 mt-3 text-sm text-gray-600 rounded-md bg-gray-50"
          >
            <p>{doctor.bio}</p>
          </div>
        )}
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1.5">
          Available on:
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {doctor.availability.map((day) => (
            <span
              key={day}
              className={`px-2 py-1 text-xs rounded-full ${
                doctor.availableToday &&
                day ===
                  new Date().toLocaleDateString("en-US", { weekday: "long" })
                  ? "bg-green-100 text-green-800 border border-green-300 font-medium"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {day}
              {doctor.availableToday &&
                day ===
                  new Date().toLocaleDateString("en-US", { weekday: "long" }) &&
                " (Today)"}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={() => onBookAppointment(doctor)}
          className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Book appointment with ${doctor.name}`}
        >
          <CalendarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default React.memo(DoctorCard);
