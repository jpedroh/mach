import type { DatabaseConnection } from '@mach/shared-database/connection'

export async function fetchFlightById(
  dbClient: DatabaseConnection,
  id: string
) {
  return dbClient.query.flights.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  })
}
