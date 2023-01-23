import { Airport } from "../services/fetch-airports";

export function formatAirport(airport: Airport) {
  if (airport.name === airport.city) {
    return `${airport.AeroCode} - ${airport.name}`;
  }
  return `${airport.AeroCode} - ${airport.name} - ${airport.city}`;
}
