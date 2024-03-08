import {
  Airport,
  Flight,
  airports as airportsSchema,
  db,
  flights as flightsSchema,
} from '@mach/shared/database'
import { inArray } from 'drizzle-orm'

function sliceArray<T>(items: T[]) {
  const response: T[][] = []

  let i = 0
  const step = 50

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
    const flightsSlices = sliceArray(flights).map((flights) =>
      db.insert(flightsSchema).values(flights)
    )
    const airportsSlices = sliceArray(airports).map((airports) =>
      db.insert(airportsSchema).values(airports)
    )

    await db.batch([
      db.delete(airportsSchema).where(
        inArray(
          airportsSchema.id,
          airports.map((v) => v.id)
        )
      ),
      ...airportsSlices,
      ...flightsSlices,
    ])
  }
}

export default makeSaveData
