import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      role="article"
      aria-label={`Doctor profile for ${doctor.name}`}
    >
      <div className="flex items-start space-x-4">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">{doctor.rating}</span>
          </div>
          <p className="text-gray-600 mt-1">{doctor.location}</p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-700">Available on:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {doctor.availability.map((day) => (
                <span
                  key={day}
                  className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onBookAppointment(doctor)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors"
        aria-label={`Book appointment with ${doctor.name}`}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
