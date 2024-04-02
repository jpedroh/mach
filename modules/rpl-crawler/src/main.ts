import { Airport, Flight } from '@mach/shared/database'
import Logger from './utils/logger'
import { fetchAirportsData } from './fetch-airports-data'

type MainDependencies = {
  updateChecker: (date: string) => Promise<boolean>
  rplFileDownloader: (date: string) => Promise<Buffer>
  rplFileLinesExtractor: (file: Buffer) => string[]
  flightDecoder: (line: string) => Omit<Flight, 'cycle'>
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
  flightDecoder,
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
    const flights = Array.from(filesLines)
      .map(flightDecoder)
      .map((flight) => ({ ...flight, cycle: date }))
    Logger.info(`COMPLETED DECODING OF RPL FILES DATA`)

    Logger.info(`STARTING FETCHING OF AIRPORTS DATA`)
    const airports = await fetchAirportsData(
      new Set([
        ...flights.map((v) => v.departureIcao),
        ...flights.map((v) => v.arrivalIcao),
      ])
    )
    Logger.info(`COMPLETED FETCHING OF AIRPORTS DATA`)

    Logger.info(`STARTING SAVING DECODED DATA TO DATABASE`)
    await saveData({ cycle: date, flights, airports })
    Logger.info(`COMPLETED SAVING DECODED DATA TO DATABASE`)

    Logger.info(`COMPLETED RPL UPDATE FOR ${date}`)

    Logger.info(`${flights.length} FLIGHTS INSERTED`)
  }
}
