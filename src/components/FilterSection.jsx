import React from 'react';

const FilterSection = ({
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
  availableDays,
  selectedDay,
  onDayChange
}) => {
  return (
    <div
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      role="search"
      aria-label="Filter doctors"
    >
      <div>
        <label
          htmlFor="specialty-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Specialty
        </label>
        <select
          id="specialty-filter"
          value={selectedSpecialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md
                     shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="availability-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Availability
        </label>
        <select
          id="availability-filter"
          value={selectedDay}
          onChange={(e) => onDayChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md
                     shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">Any Day</option>
          {availableDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Filter Buttons */}
      <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => {
            onSpecialtyChange('All');
            onDayChange('All');
          }}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full
                     hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-blue-500"
        >
          Clear Filters
        </button>
        <button
          onClick={() => onDayChange('Today')}
          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-full
                     hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-blue-500"
        >
          Available Today
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
