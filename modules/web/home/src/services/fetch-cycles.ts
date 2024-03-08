import { db, flights } from '@mach/shared/database'
import { desc } from 'drizzle-orm'

export async function fetchCycles() {
  const cycles = await db
    .selectDistinct({ cycle: flights.cycle })
    .from(flights)
    .orderBy(desc(flights.cycle))

  return cycles.map((v) => v.cycle)
}
