import type { Flight } from '@mach/shared-database/schema'

type Data = Omit<Flight, 'cycle'>

export type ParseResult<T, E = string> =
  | { valid: true; data: T }
  | { valid: false; error: E }

export type ParseFlightResult<R = string> = ParseResult<
  Data,
  FlightParsingError<R>
>

export type FlightParsingError<R = string> = {
  field: keyof Data
  input: R
  message: string
}
