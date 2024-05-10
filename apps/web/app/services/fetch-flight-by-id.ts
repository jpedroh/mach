import { DatabaseConnection } from '@mach/shared/database'
import { z } from 'zod'

const idSchema = z.string().uuid()

export async function fetchFlightById(db: DatabaseConnection, id: string) {
  if (idSchema.safeParse(id).error) {
    return null
  }

  const flight = await db.query.flights.findFirst({
    where: (flights, { eq }) => eq(flights.id, id),
  })
  if (flight == null) {
    return null
  }

  const {
    aircraftIcaoCode,
    aircraftEquipment,
    aircraftWakeTurbulence,
    ...rest
  } = flight

  return {
    ...rest,
    aircraft: {
      icaoCode: aircraftIcaoCode,
      equipment: aircraftEquipment,
      wakeTurbulence: aircraftWakeTurbulence,
    },
  }
}
