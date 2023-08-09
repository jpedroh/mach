import { FlightRules } from '@mach/common'

export const formatFlightRules = (flightRule: FlightRules) => {
  const mappings = {
    ['IFR']: 'I',
    ['Y']: 'Y',
    ['Z']: 'Z'
  }
  return mappings[flightRule]
}
