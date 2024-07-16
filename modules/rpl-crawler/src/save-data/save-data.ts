import {
  Airport,
  Flight,
  airports as airportsSchema,
  companies,
  cycles,
  db,
  flights as flightsSchema,
} from '../../../shared-database/src'
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
    cycle,
    flights,
    airports,
  }: {
    cycle: string
    flights: Flight[]
    airports: Airport[]
  }): Promise<void> => {
    const flightsSlices = sliceArray(flights).map((flights) =>
      db.insert(flightsSchema).values(flights)
    )
    const airportsSlices = sliceArray(airports).map((airports) =>
      db.insert(airportsSchema).values(airports)
    )

    const filteredCompanies = [...new Set(flights.map((v) => v.company))]
    const companiesSlices = filteredCompanies.map((company) => {
      return db.insert(companies).values({ company }).onConflictDoNothing()
    })

    await db.batch([
      db.insert(cycles).values({ cycle, totalFlights: flights.length }),
      ...companiesSlices,
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
