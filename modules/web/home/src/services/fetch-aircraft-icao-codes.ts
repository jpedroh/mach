import { db, flights } from '@mach/shared/database'
import { eq } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/current-cycle-subquery'

export async function fetchAircraftIcaoCodes() {
  const aircrafts = await db
    .selectDistinct({ aircraftIcaoCode: flights.aircraftIcaoCode })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return aircrafts.map((v) => v.aircraftIcaoCode) ?? []
}
