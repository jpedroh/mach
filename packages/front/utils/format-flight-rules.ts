import { FlightRules } from '@mach/common'

const formatFlightRules = (flightRule: FlightRules): string => {
  const mappings = {}
  mappings[FlightRules.IFR] = 'I'
  mappings[FlightRules.Y] = 'Y'
  mappings[FlightRules.Z] = 'Z'
  return mappings[flightRule]
}

export default formatFlightRules
