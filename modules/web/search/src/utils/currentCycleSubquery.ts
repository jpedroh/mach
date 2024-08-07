import { cycles, db } from '@mach/shared-database'
import { sql } from 'drizzle-orm'

export const currentCycleSubquery = db
  .select({ cycle: sql<string>`MAX(${cycles.cycle})` })
  .from(cycles)
