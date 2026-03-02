import type { Flight } from '@mach/shared-database/schema'

type Data = Omit<Flight, 'cycle'>

export type ParseResult<T, E = string> =
  | { valid: true; data: T }
  | { valid: false; error: E }

export type ParseFlightResult<R = unknown> = ParseResult<
  Data,
  FlightParsingError<R>
>

export type FlightParsingError<R = unknown> = {
  field: keyof Data
  input: R
  message: string
}
