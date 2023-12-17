import { db, flights } from '@mach/shared/database'
import { eq, sql } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'

export async function fetchAircraftIcaoCodes() {
  const aircrafts = await db
    .select({
      aircraftIcaoCode: sql<string>`DISTINCT(aircraft_icao_code)`,
    })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return aircrafts?.map((v) => v.aircraftIcaoCode) ?? []
}
