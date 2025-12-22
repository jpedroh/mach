import type { Flight } from '@mach/shared-database/schema'

type Data = Omit<Flight, 'cycle'>

export type ParseResult<T, E> =
  | { valid: true; data: T }
  | { valid: false; error: E }

export type ParseFlightResult = ParseResult<Data, FlightParsingError>

export type FlightParsingError = {
  field: keyof Data
  input: string
  message: string
}
