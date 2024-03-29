import { db } from '@mach/shared/database'

export async function fetchFlightById(id: string) {
  const flight = await db.query.flights.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
  })

  return flight
}
