export const statesData = {
  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Kolhapur",
    "Thane",
    "Navi Mumbai"
  ],
  "Delhi": [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
    "Shahdara",
    "North West Delhi",
    "South West Delhi",
    "North East Delhi"
  ],
  "Karnataka": [
    "Bangalore",
    "Mysore",
    "Hubli",
    "Mangalore",
    "Belgaum",
    "Gulbarga",
    "Dharwad",
    "Shimoga",
    "Bijapur",
    "Davanagere"
  ]
} as const;

export type State = keyof typeof statesData;
export type City = (typeof statesData)[State][number];