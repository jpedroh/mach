import type { DatabaseConnection } from '@mach/shared-database/connection'
import type { Airport } from '@mach/shared-database/schema'

export async function fetchAirports(db: DatabaseConnection) {
  // @ts-expect-error Broken typing from drizzle
  return db.query.airports.findMany() as Promise<Airport[]>
}
