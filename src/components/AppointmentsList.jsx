import React from 'react';

const AppointmentsList = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div
        className="text-center py-8 bg-gray-50 rounded-lg"
        role="status"
        aria-label="No appointments found"
      >
        <p className="text-gray-600">No appointments scheduled</p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4"
      role="list"
      aria-label="Your appointments"
    >
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white p-4 rounded-lg shadow"
          role="listitem"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">
                {appointment.doctorName}
              </h3>
              <p className="text-gray-600">{appointment.specialty}</p>
              <p className="text-gray-600">{appointment.location}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-blue-600">{appointment.date}</p>
              <p className="text-gray-600">{appointment.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
