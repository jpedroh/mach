import { db } from '@mach/database'

export async function fetchAirports() {
  return db.query.airports.findMany()
}
