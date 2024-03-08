import { db, flights } from '@mach/shared/database'
import { eq } from 'drizzle-orm'
import { currentCycleSubquery } from '../utils/current-cycle-subquery'

export async function fetchCompanies() {
  const companies = await db
    .selectDistinct({
      company: flights.company,
    })
    .from(flights)
    .where(eq(flights.cycle, currentCycleSubquery))

  return companies.map((v) => String(v.company))
}
