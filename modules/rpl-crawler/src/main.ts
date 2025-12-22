import type { Airport, Flight } from '@mach/shared-database/schema'
import { fetchAirportsData } from './fetch-airports-data'
import type { ParseFlightResult } from './flight-parser'
import * as Logger from './utils/logger'

type MainDependencies = {
  updateChecker: (date: string) => Promise<boolean>
  rplFileDownloader: (date: string) => Promise<Buffer>
  rplFileLinesExtractor: (file: Buffer) => string[]
  flightParser: (line: string) => ParseFlightResult
  saveData: (data: {
    cycle: string
    flights: Flight[]
    airports: Airport[]
  }) => Promise<void>
}

export function makeRunRplCrawler({
  updateChecker,
  rplFileDownloader,
  rplFileLinesExtractor,
  flightParser,
  saveData,
}: MainDependencies) {
  return async (date: string) => {
    Logger.info(`CHECKING IF EXISTS UPDATES FOR ${date}`)
    const hasUpdate = await updateChecker(date)
    if (!hasUpdate) {
      Logger.info(`NO UPDATES FOUND FOR ${date}`)
      return
    }

    Logger.info(`STARTING RPL UPDATE FOR ${date}`)

    Logger.info(`STARTING RPL FILE DOWNLOAD`)
    const file = await rplFileDownloader(date)
    Logger.info(`COMPLETED RPL FILE DOWNLOAD`)

    Logger.info(`STARTING LINES EXTRACTION FROM RPL FILE`)
    const filesLines = rplFileLinesExtractor(file)
    Logger.info(`COMPLETED LINES EXTRACTION FROM RPL FILE`)

    Logger.info(`STARTING DECODING OF RPL FILES DATA`)
    const [parsedFlights, erroredFlights] = Array.from(filesLines).reduce(
      ([valid, invalid], line) => {
        const result = flightParser(line)
        if (result.valid === true) {
          valid.push({ ...result.data, cycle: date })
        } else {
          invalid.push({ line, error: result.error })
        }
        return [valid, invalid]
      },
      [[], []]
    )
    Logger.info(`COMPLETED DECODING OF RPL FILES DATA`)

    if (erroredFlights.length > 0) {
      Logger.info(`THERE WERE INVALID FLIGHTS DURING PARSING`)
      erroredFlights.forEach((result) => console.log(result))
    }

    Logger.info(`STARTING FETCHING OF AIRPORTS DATA`)
    const airports = await fetchAirportsData(
      new Set([
        ...parsedFlights.map((v) => v.departureIcao),
        ...parsedFlights.map((v) => v.arrivalIcao),
      ])
    )
    Logger.info(`COMPLETED FETCHING OF AIRPORTS DATA`)

    Logger.info(`STARTING SAVING DECODED DATA TO DATABASE`)
    await saveData({ cycle: date, flights: parsedFlights, airports })
    Logger.info(`COMPLETED SAVING DECODED DATA TO DATABASE`)

    Logger.info(`COMPLETED RPL UPDATE FOR ${date}`)

    Logger.info(`${parsedFlights.length} FLIGHTS INSERTED`)

    return erroredFlights.length
  }
}
