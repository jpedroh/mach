import type { Flight } from '@mach/shared-database/schema'

type Data = Omit<Flight, 'cycle'>

export type ParseFlightResult =
  | { valid: true; flight: Data }
  | { valid: false; errors: FlightParsingError[] }

export type FlightParsingError = {
  field: keyof Data
  input: string
  message: string
}
