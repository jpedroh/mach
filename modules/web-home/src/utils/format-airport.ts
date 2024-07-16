import { Airport } from '../../../../shared-database/src'

export function formatAirport(airport: Airport) {
  if (airport.name === airport.city) {
    return `${airport.id} - ${airport.name}`
  }
  return `${airport.id} - ${airport.name} - ${airport.city}`
}
