import type { db } from '@mach/shared-database/connection'

export async function fetchFlightById(dbClient: typeof db, id: string) {
  return dbClient.query.flights.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  })
}
