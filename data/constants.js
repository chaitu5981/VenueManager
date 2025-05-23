export const venueTypes = [
  { value: "Convention Hall", label: "Convention Hall" },
  { value: "Hotel-Banquet Hall", label: "Hotel-Banquet Hall" },
  { value: "Resort", label: "Resort" },
  { value: "Function Hall", label: "Function Hall" },
  { value: "Club House", label: "Club House" },
  { value: "Farm House", label: "Farm House" },
  { value: "Villas", label: "Villas" },
  { value: "Others", label: "Others" },
];

export const subVenueStatus = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

export const currencies = [
  { value: "inr", label: "₹ Indian Rupee" },
  { value: "usd", label: "$ United States Dollar" },
  { value: "eur", label: "€ Euro" },
];
export const businessLabelTypes = [
  { value: "GST", label: "GST" },
  { value: "PAN", label: "PAN" },
  { value: "VAT", label: "VAT" },
];
export const months = [
  { label: "Jan", value: "0" },
  { label: "Feb", value: "1" },
  { label: "Mar", value: "2" },
  { label: "Apr", value: "3" },
  { label: "May", value: "4" },
  { label: "Jun", value: "5" },
  { label: "Jul", value: "6" },
  { label: "Aug", value: "7" },
  { label: "Sep", value: "8" },
  { label: "Oct", value: "9" },
  { label: "Nov", value: "10" },
  { label: "Dec", value: "11" },
];

export const eventTypes = [
  {
    value: "traditional",
    label: "Traditional Events",
    subEventTypes: [
      { value: "engagement", label: "1.Engagement" },
      { value: "wedding", label: "2.Wedding" },
      { value: "reception", label: "3.Reception" },
    ],
  },
  {
    value: "regular",
    label: "Regular Events",
    subEventTypes: [
      { value: "birthday", label: "1.Birthday Event" },
      { value: "saree", label: "2.Saree Ceremony" },
      { value: "dhoti", label: "3.Dhoti Ceremony" },
    ],
  },
  {
    value: "corporate",
    label: "Corporate Events",
    subEventTypes: [
      { value: "productLaunch", label: "1.Product Launch" },
      { value: "conference", label: "2.Conference Meeting" },
      { value: "meetUps", label: "3.Meet-Ups" },
    ],
  },
  {
    value: "hangouts",
    label: "Hangouts (Farmhouses/Villas)",
    subEventTypes: [
      { value: "family", label: "1.Family" },
      { value: "friends", label: "2.Friends" },
      { value: "employees", label: "3.Employees" },
    ],
  },
  { value: "others", label: "Others" },
];

export const bookingTypes = [
  {
    value: "breakfast",
    label: "1.Breakfast",
  },
  {
    value: "lunch",
    label: "2.Lunch",
  },
  {
    value: "dinner",
    label: "3.Dinner",
  },
  {
    value: "wholeDay",
    label: "4.Book for Whole day",
  },
];
export const diningMenu = [
  {
    value: "breakfast",
    label: "1.Breakfast",
  },
  {
    value: "veg",
    label: "2.Veg",
  },
  {
    value: "nonVeg",
    label: "3.Non Veg",
  },
];

export const accommodationTypes = [
  {
    value: "perRoom",
    label: "Charge per Room",
  },
  {
    value: "perPerson",
    label: "Charge per Person",
  },
];
