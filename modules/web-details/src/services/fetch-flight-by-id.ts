import type { db } from '../../../shared-database/src'

export async function fetchFlightById(dbClient: typeof db, id: string) {
  return dbClient.query.flights.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  })
}
