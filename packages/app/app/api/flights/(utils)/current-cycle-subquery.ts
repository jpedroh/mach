import { db, flights } from '@mach/shared/database'
import { sql } from 'drizzle-orm'

export const currentCycleSubquery = db
  .select({ cycle: sql<string>`MAX(${flights.cycle})` })
  .from(flights)
