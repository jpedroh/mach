import { cycles, db } from '../../../../shared-database/src'
import { sql } from 'drizzle-orm'

export const currentCycleSubquery = db
  .select({ cycle: sql<string>`MAX(${cycles.cycle})` })
  .from(cycles)
