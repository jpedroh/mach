import { db, flights } from '@mach/database'
import { desc } from 'drizzle-orm'

export const currentCycleSubquery = db
  .select({ cycle: flights.cycle })
  .from(flights)
  .limit(1)
  .orderBy(desc(flights.cycle))
