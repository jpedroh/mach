const weekdays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
export type Weekdays = (typeof weekdays)[number];

const flightRules = ["IFR", "Y", "Z"] as const;
export type FlightRules = (typeof flightRules)[number];

const wakeTurbulence = ["L", "M", "H"] as const;
export type WakeTurbulence = (typeof wakeTurbulence)[number];
