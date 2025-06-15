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
  { label: "Jan", value: 0 },
  { label: "Feb", value: 1 },
  { label: "Mar", value: 2 },
  { label: "Apr", value: 3 },
  { label: "May", value: 4 },
  { label: "Jun", value: 5 },
  { label: "Jul", value: 6 },
  { label: "Aug", value: 7 },
  { label: "Sep", value: 8 },
  { label: "Oct", value: 9 },
  { label: "Nov", value: 10 },
  { label: "Dec", value: 11 },
];
export const subscriptionTypes = [
  { type: "Monthly", charge: "200" },
  { type: "Quarterly", charge: "600" },
  { type: "Yearly", charge: "2000" },
];
export const eventTypes = [
  {
    value: "traditional",
    label: "Traditional Events",
    subEventTypes: [
      { value: "Engagement", label: "1.Engagement" },
      { value: "Wedding", label: "2.Wedding" },
      { value: "Reception", label: "3.Reception" },
    ],
  },
  {
    value: "regular",
    label: "Regular Events",
    subEventTypes: [
      { value: "Birthday", label: "1.Birthday Event" },
      { value: "Saree", label: "2.Saree Ceremony" },
      { value: "Dhoti", label: "3.Dhoti Ceremony" },
    ],
  },
  {
    value: "corporate",
    label: "Corporate Events",
    subEventTypes: [
      { value: "ProductLaunch", label: "1.Product Launch" },
      { value: "Conference", label: "2.Conference Meeting" },
      { value: "MeetUps", label: "3.Meet-Ups" },
    ],
  },
  {
    value: "hangouts",
    label: "Hangouts (Farmhouses/Villas)",
    subEventTypes: [
      { value: "Family", label: "1.Family" },
      { value: "Friends", label: "2.Friends" },
      { value: "Employees", label: "3.Employees" },
    ],
  },
  { value: "others", label: "Others" },
];

export const bookingTypes = [
  {
    value: "Breakfast",
    label: "Breakfast",
  },
  {
    value: "Lunch",
    label: "Lunch",
  },
  {
    value: "Dinner",
    label: "Dinner",
  },
  {
    value: "WholeDay",
    label: "Book for Whole day",
  },
];
export const diningMenu = [
  {
    value: "Breakfast",
    label: "1.Breakfast",
  },
  {
    value: "Tea And Snacks",
    label: "2.Tea And Snacks",
  },
  {
    value: "Veg",
    label: "3.Veg",
  },
  {
    value: "Non-Veg",
    label: "4.Non Veg",
  },
  {
    value: "Veg with Alcohol",
    label: "4.Veg with Alcohol",
  },
  {
    value: "Non-Veg with Alcohol",
    label: "5.Non Veg with Alcohol",
  },
];

export const accommodationTypes = [
  {
    value: "room",
    label: "Charge per Room",
  },
  {
    value: "person",
    label: "Charge per Person",
  },
];
