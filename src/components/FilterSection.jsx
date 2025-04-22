import React from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/20/solid";

const FilterSection = ({
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
  availableDays,
  selectedDay,
  onDayChange,
}) => {
  const handleClearFilters = () => {
    onSpecialtyChange("All");
    onDayChange("All");
  };

  const handleTodayFilter = () => {
    onDayChange("Today");
  };

  const hasActiveFilters = selectedSpecialty !== "All" || selectedDay !== "All";

  return (
    <div
      className="p-4 mb-6 bg-white rounded-lg shadow-sm sm:p-6"
      role="search"
      aria-label="Filter doctors"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-medium text-gray-900">
          <FunnelIcon
            className="w-5 h-5 mr-2 text-gray-500"
            aria-hidden="true"
          />
          Filter Options
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center px-2 py-1 text-sm text-blue-600 rounded-md hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Clear all filters"
          >
            <XMarkIcon className="w-4 h-4 mr-1" aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="specialty-filter"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Specialty
          </label>
          <div className="relative">
            <select
              id="specialty-filter"
              value={selectedSpecialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter by medical specialty"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="availability-filter"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Availability
          </label>
          <div className="relative">
            <select
              id="availability-filter"
              value={selectedDay}
              onChange={(e) => onDayChange(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter by availability"
            >
              <option value="All">Any Day</option>
              <option value="Today">Today</option>
              {availableDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handleTodayFilter}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
            selectedDay === "Today"
              ? "bg-blue-100 text-blue-800 border border-blue-300"
              : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
          }`}
          aria-pressed={selectedDay === "Today"}
        >
          Available Today
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterSection);
