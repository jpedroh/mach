import type { DatabaseConnection } from '../../../../shared-database/src'

export async function fetchAirports(db: DatabaseConnection) {
  return db.query.airports.findMany()
}
