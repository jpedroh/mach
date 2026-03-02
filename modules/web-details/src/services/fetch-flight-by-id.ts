import type { DatabaseConnection } from '@mach/shared-database/connection'

export async function fetchFlightById(
  dbClient: DatabaseConnection,
  id: string
) {
  const flight = await dbClient.query.flights.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  })
  if (!flight) {
    throw new Error('Could not find flight by id')
  }
  return flight
}
