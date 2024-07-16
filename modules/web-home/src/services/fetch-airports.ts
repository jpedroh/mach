import type { DatabaseConnection } from '@mach/shared-database'

export async function fetchAirports(db: DatabaseConnection) {
  return db.query.airports.findMany()
}
