import React, { useState, useCallback, useMemo } from "react";
import { doctors, specialties, availableDays } from "./data/mockData";
import DoctorCard from "./components/DoctorCard";
import FilterSection from "./components/FilterSection";
import BookingModal from "./components/BookingModal";
import AppointmentsList from "./components/AppointmentsList";

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
      const matchesDay =
        selectedDay === "All"
          ? true
          : selectedDay === "Today"
          ? doctor.availableToday
          : doctor.availability.includes(selectedDay);

      return matchesSpecialty && matchesDay;
    });
  }, [selectedSpecialty, selectedDay]);

  const handleSpecialtyChange = useCallback((specialty) => {
    setSelectedSpecialty(specialty);
  }, []);

  const handleDayChange = useCallback((day) => {
    setSelectedDay(day);
  }, []);

  const handleBookAppointment = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirmBooking = useCallback(
    (selectedTime) => {
      if (!selectedTime || !selectedDoctor) return;

      const newAppointment = {
        id: Date.now(),
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        location: selectedDoctor.location,
        date: new Date().toLocaleDateString(),
        time: selectedTime,
      };

      setAppointments((prev) => [...prev, newAppointment]);
      setIsModalOpen(false);
      setSelectedDoctor(null);
    },
    [selectedDoctor]
  );

  const ResultsSummary = useMemo(() => {
    if (filteredDoctors.length === 0) {
      return (
        <div className="mb-4 text-gray-600" role="status">
          No doctors found matching your criteria
        </div>
      );
    }

    return (
      <div className="mb-4 text-gray-600" role="status" aria-live="polite">
        Found {filteredDoctors.length} doctor
        {filteredDoctors.length === 1 ? "" : "s"}
        {selectedSpecialty !== "All" && ` specializing in ${selectedSpecialty}`}
        {selectedDay !== "All" && ` available on ${selectedDay}`}
      </div>
    );
  }, [filteredDoctors.length, selectedSpecialty, selectedDay]);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Your Doctor Appointment
          </h1>
          <p className="mt-2 text-gray-600">
            Find and book appointments with top specialists in your area
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FilterSection
                specialties={specialties}
                selectedSpecialty={selectedSpecialty}
                onSpecialtyChange={handleSpecialtyChange}
                availableDays={availableDays}
                selectedDay={selectedDay}
                onDayChange={handleDayChange}
              />

              {ResultsSummary}

              {filteredDoctors.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-lg shadow">
                  <p className="text-gray-500">
                    No doctors available with the selected filters. Try
                    adjusting your filters to see more results.
                  </p>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  role="region"
                  aria-label="Doctors list"
                >
                  {filteredDoctors.map((doctor) => (
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
              <aside className="sticky p-6 bg-white rounded-lg shadow top-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  My Appointments
                </h2>
                <AppointmentsList appointments={appointments} />
              </aside>
            </div>
          </div>
        </main>

        {selectedDoctor && (
          <BookingModal
            doctor={selectedDoctor}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    </div>
  );
}

export default App;
