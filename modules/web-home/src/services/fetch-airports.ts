import type { Airport, DatabaseConnection } from '@mach/shared-database'

export async function fetchAirports(db: DatabaseConnection) {
  // @ts-expect-error Broken typing from drizzle
  return db.query.airports.findMany() as Promise<Airport[]>
}
