import {
  Airport,
  Flight,
  airports as airportsSchema,
  db,
  flights as flightsSchema,
} from '@mach/database'
import { inArray } from 'drizzle-orm'

function sliceArray<T>(items: T[]) {
  const response: T[][] = []

  let i = 0
  const step = 5000

  for (; i < items.length; i += step) {
    response.push(items.slice(i, i + step))
  }

  if (i < items.length) {
    response.push(items.slice(i))
  }

  return response
}

const makeSaveData = () => {
  return async ({
    flights,
    airports,
  }: {
    flights: Flight[]
    airports: Airport[]
  }): Promise<void> => {
    await db.transaction(async (tx) => {
      const slicedFlights = sliceArray(flights)
      for (const slice of slicedFlights) {
        await tx.insert(flightsSchema).values(slice)
      }

      await tx.delete(airportsSchema).where(inArray(airportsSchema.id, airports.map(v => v.id)))

      const slicedAirports = sliceArray(airports)
      for (const slice of slicedAirports) {
        await tx.insert(airportsSchema).values(slice)
      }
    })
  }
}

export default makeSaveData
