import type { DatabaseConnection } from '@mach/shared-database/connection'

export async function fetchAirports(db: DatabaseConnection) {
  return db.query.airports.findMany()
}
