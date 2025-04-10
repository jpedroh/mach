import { type DatabaseConnection } from '@mach/shared-database/connection'
import { cycles } from '@mach/shared-database/schema'
import { sql } from 'drizzle-orm'

export const currentCycleSubquery = (db: DatabaseConnection) =>
  db.select({ cycle: sql<string>`MAX(${cycles.cycle})` }).from(cycles)
