# Doctor Appointment Booking UI

A responsive and accessible doctor booking UI module built with React.

## Features

- **Doctor Directory View**

  - List of doctors with details (name, photo, specialty, availability, location)
  - Filter by specialty and availability
  - Book appointment button on each card
  - Expandable doctor details section

- **Booking Modal**

  - Opens when "Book Appointment" is clicked
  - Shows doctor name and available time slots
  - Allows selecting a time slot and confirming

- **Appointments Summary View**
  - Shows booked appointments
  - Displays doctor, specialty, date/time, and location

## Tech Stack

- React (with Hooks)
- JavaScript
- Tailwind CSS
- Jest and React Testing Library

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
cd doctor-booking-ui
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Run tests

```bash
npm test
```

## Accessibility Features

This application was built with accessibility in mind:

- Proper semantic HTML elements
- ARIA attributes for improved screen reader experience
- Keyboard navigation support
- Focus management in modal dialogs
- Color contrast compliance
- Responsive design for all screen sizes

## AI Tools Used

The following AI tools were used to accelerate development:

- **Claude AI via Cursor**: For code suggestions and component scaffolding
- **Jest-axe**: For automated accessibility testing
- **React Testing Library**: For component testing with accessibility in mind

## Performance Optimizations

- React.memo for component memoization
- useMemo for expensive computations
- useCallback for stable function references
- Lazy loading images with loading="lazy"
- Optimized rendering with conditional rendering
- State management with proper React hooks

## Future Improvements

- Add pagination for large doctor lists
- Implement a more robust state management solution (Zustand/Redux)
- Add date selection to booking modal
- Implement form validation for user inputs
- Add search functionality
- Add appointment cancellation feature
- Implement animations for smoother UI transitions
