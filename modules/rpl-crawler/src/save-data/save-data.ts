import { db } from '@mach/shared-database/connection'
import {
  type Airport,
  type Flight,
  airports as airportsSchema,
  companies as companiesSchema,
  cycles as cyclesSchema,
  flights as flightsSchema,
} from '@mach/shared-database/schema'
import { inArray } from 'drizzle-orm'
import * as Logger from '../utils/logger'

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
    const filteredCompanies = [...new Set(flights.map((v) => v.company))]

    await db.transaction(async (tx) => {
      // Insert cycles
      Logger.info('Started inserting cycles')
      await tx
        .insert(cyclesSchema)
        .values({ cycle, totalFlights: flights.length })
        .onConflictDoNothing()
      Logger.info('Finished inserting cycles')

      // Insert companies
      Logger.info('Started inserting companies')
      await tx
        .insert(companiesSchema)
        .values(filteredCompanies.map((company) => ({ company })))
        .onConflictDoNothing()
      Logger.info('Finished inserting companies')

      // Update airports
      Logger.info('Started removing airports')
      await tx.delete(airportsSchema).where(
        inArray(
          airportsSchema.id,
          airports.map((v) => v.id)
        )
      )
      Logger.info('Started inserting updated airports')
      await tx.insert(airportsSchema).values(airports)

      // Insert flights
      Logger.info('Started inserting flights')
      const flightsSlices = sliceArray(flights)
      for (const [index, flightsSlice] of flightsSlices.entries()) {
        Logger.info(
          `Started inserting slice ${index} of ${flightsSlices.length}`
        )
        await tx.insert(flightsSchema).values(flightsSlice)
        Logger.info(
          `Finished inserting slice ${index} of ${flightsSlices.length}`
        )
      }
      Logger.info('Finished inserting flights')
    })
  }
}

export default makeSaveData
