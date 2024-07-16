import { FlightRules } from '../../../shared-database/src'

export const formatFlightRules = (flightRule: FlightRules) => {
  const mappings = {
    ['IFR']: 'I',
    ['Y']: 'Y',
    ['Z']: 'Z',
  }
  return mappings[flightRule]
}
