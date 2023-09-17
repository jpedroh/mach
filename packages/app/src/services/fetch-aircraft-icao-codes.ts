import { db, flights } from '@mach/database'
import { eq, sql } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'

export async function fetchAircraftIcaoCodes() {
  const aircrafts = await db
    .select({
      aircraftIcaoCode: sql<string>`DISTINCT(${flights.aircraft}->>"$.icaoCode")`,
    })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return aircrafts?.map((v) => v.aircraftIcaoCode) ?? []
}
