import type { Flight } from '@mach/shared-database/schema'

export type ParseFlightResult =
  | { valid: true; flight: Omit<Flight, 'cycle'> }
  | { valid: false; input: string; error: string }
