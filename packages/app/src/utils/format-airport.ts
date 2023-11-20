import { Airport } from '@mach/database'

export function formatAirport(airport: Airport) {
  if (airport.name === airport.city) {
    return `${airport.id} - ${airport.name}`
  }
  return `${airport.id} - ${airport.name} - ${airport.city}`
}
