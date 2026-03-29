import { type DatabaseConnection } from '@mach/shared-database/connection'
import { sql } from '@mach/shared-database/drizzle'
import { cycles } from '@mach/shared-database/schema'

export const currentCycleSubquery = (db: DatabaseConnection) =>
  db.select({ cycle: sql<string>`MAX(${cycles.cycle})` }).from(cycles)
