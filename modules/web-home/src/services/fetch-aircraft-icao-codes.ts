import { type DatabaseConnection } from '@mach/shared-database/connection'
import { eq } from '@mach/shared-database/drizzle'
import { flights } from '@mach/shared-database/schema'
import { currentCycleSubquery } from '../utils/current-cycle-subquery'

export async function fetchAircraftIcaoCodes(db: DatabaseConnection) {
  const aircrafts = await db
    .selectDistinct({ aircraftIcaoCode: flights.aircraftIcaoCode })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return aircrafts.map((v) => v.aircraftIcaoCode) ?? []
}
