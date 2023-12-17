import { db, flights } from '@mach/shared/database'
import { desc, sql } from 'drizzle-orm'

export async function fetchCycles() {
  const cycles = await db
    .select({
      cycle: sql<string>`DISTINCT(${flights.cycle})`,
    })
    .from(flights)
    .orderBy(desc(flights.cycle))

  return cycles.map((v) => v.cycle)
}
