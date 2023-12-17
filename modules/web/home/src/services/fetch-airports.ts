import { db } from '@mach/shared/database'

export async function fetchAirports() {
  return db.query.airports.findMany()
}
