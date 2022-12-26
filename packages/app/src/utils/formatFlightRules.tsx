import { FlightRules } from '@mach/common'

export const formatFlightRules = (flightRule: FlightRules) => {
  const mappings = {
    [FlightRules.IFR]: 'I',
    [FlightRules.Y]: 'Y',
    [FlightRules.Z]: 'Z'
  }
  return mappings[flightRule]
}
