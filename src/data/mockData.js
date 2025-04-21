export const availableDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "Cardiologist",
    rating: 4.8,
    availability: ["Monday", "Wednesday", "Friday"],
    availableToday: today === "Monday" || today === "Wednesday" || today === "Friday",
    location: "New York Medical Center",
    timeSlots: [
      "09:00 AM", "10:00 AM", "11:00 AM",
      "02:00 PM", "03:00 PM", "04:00 PM"
    ]
  },
  {
    id: 2,
    name: "Dr. James Chen",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    specialty: "Dermatologist",
    rating: 4.9,
    availability: ["Tuesday", "Thursday", "Saturday"],
    location: "Downtown Clinic",
    timeSlots: [
      "09:30 AM", "10:30 AM", "11:30 AM",
      "02:30 PM", "03:30 PM", "04:30 PM"
    ]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    specialty: "Pediatrician",
    rating: 4.7,
    availability: ["Monday", "Tuesday", "Thursday"],
    location: "Children's Medical Center",
    timeSlots: [
      "08:00 AM", "09:00 AM", "10:00 AM",
      "01:00 PM", "02:00 PM", "03:00 PM"
    ]
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    specialty: "Orthopedist",
    rating: 4.6,
    availability: ["Wednesday", "Friday", "Saturday"],
    location: "Sports Medicine Clinic",
    timeSlots: [
      "10:00 AM", "11:00 AM", "12:00 PM",
      "03:00 PM", "04:00 PM", "05:00 PM"
    ]
  }
];

export const specialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedist"
];
