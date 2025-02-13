import type { FlightRules } from '@mach/shared-database/enum'

export const formatFlightRules = (flightRule: FlightRules) => {
  const mappings = {
    ['IFR']: 'I',
    ['Y']: 'Y',
    ['Z']: 'Z',
  }
  return mappings[flightRule]
}
