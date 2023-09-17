import { db, flights } from '@mach/database'
import { eq, sql } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'

export async function fetchCompanies() {
  const companies = await db
    .select({
      company: sql`DISTINCT(${flights.company})`,
    })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return companies.map((v) => String(v.company))
}
