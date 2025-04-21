import React, { useState } from 'react';
import { doctors, specialties, availableDays } from './data/mockData';
import DoctorCard from './components/DoctorCard';
import FilterSection from './components/FilterSection';
import BookingModal from './components/BookingModal';
import AppointmentsList from './components/AppointmentsList';

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Enhanced filtering logic
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesDay = selectedDay === 'All'
      ? true
      : selectedDay === 'Today'
        ? doctor.availableToday
        : doctor.availability.includes(selectedDay);

    return matchesSpecialty && matchesDay;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (selectedTime) => {
    const newAppointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      location: selectedDoctor.location,
      date: new Date().toLocaleDateString(),
      time: selectedTime
    };

    setAppointments([...appointments, newAppointment]);
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  // Add a results summary
  const getResultsSummary = () => {
    if (filteredDoctors.length === 0) {
      return (
        <div className="text-gray-600 mb-4">
          No doctors found matching your criteria
        </div>
      );
    }

    return (
      <div className="text-gray-600 mb-4">
        Found {filteredDoctors.length} doctor{filteredDoctors.length === 1 ? '' : 's'}
        {selectedSpecialty !== 'All' && ` specializing in ${selectedSpecialty}`}
        {selectedDay !== 'All' && ` available on ${selectedDay}`}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Book Your Doctor Appointment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FilterSection
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              onSpecialtyChange={setSelectedSpecialty}
              availableDays={availableDays}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
            />

            {getResultsSummary()}

            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">
                  No doctors available with the selected filters.
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                role="region"
                aria-label="Doctors list"
              >
                {filteredDoctors.map(doctor => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                My Appointments
              </h2>
              <AppointmentsList appointments={appointments} />
            </div>
          </div>
        </div>

        {selectedDoctor && (
          <BookingModal
            doctor={selectedDoctor}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    </div>
  );
}

export default App;
