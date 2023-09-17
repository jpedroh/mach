import { FlightRules } from '@mach/database'

export const formatFlightRules = (flightRule: FlightRules) => {
  const mappings = {
    ['IFR']: 'I',
    ['Y']: 'Y',
    ['Z']: 'Z',
  }
  return mappings[flightRule]
}
