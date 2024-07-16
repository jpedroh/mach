import { flights, type DatabaseConnection } from '@mach/shared-database'
import { eq } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/current-cycle-subquery'

export async function fetchAircraftIcaoCodes(db: DatabaseConnection) {
  const aircrafts = await db
    .selectDistinct({ aircraftIcaoCode: flights.aircraftIcaoCode })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return aircrafts.map((v) => v.aircraftIcaoCode) ?? []
}
