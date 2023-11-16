import { Flight } from '@mach/database'
import Logger from './utils/logger'

type MainDependencies = {
  updateChecker: (date: string) => Promise<boolean>
  rplFileDownloader: (date: string) => Promise<Buffer>
  rplFileLinesExtractor: (file: Buffer) => string[]
  flightDecoder: (line: string) => Omit<Flight, 'cycle'>
  saveFlights: (flights: Flight[]) => Promise<void>
}

export async function runRplCrawler(
  date: string,
  {
    updateChecker,
    rplFileDownloader,
    rplFileLinesExtractor,
    flightDecoder,
    saveFlights,
  }: MainDependencies
) {
  Logger.info(`CHECKING IF EXISTS UPDATES FOR ${date}`)
  const hasUpdate = await updateChecker(date)
  if (!hasUpdate) {
    Logger.info(`NO UPDATES FOUND FOR ${date}`)
    process.exit(0)
  }

  Logger.info(`STARTING RPL UPDATE FOR ${date}`)

  Logger.info(`STARTING RPL FILE DOWNLOAD`)
  const file = await rplFileDownloader(date)
  Logger.info(`COMPLETED RPL FILE DOWNLOAD`)

  Logger.info(`STARTING LINES EXTRACTION FROM RPL FILE`)
  const filesLines = rplFileLinesExtractor(file)
  Logger.info(`COMPLETED LINES EXTRACTION FROM RPL FILE`)

  Logger.info(`STARTING DECODING OF RPL FILES DATA`)
  const flights = Array.from(filesLines).map(flightDecoder)
  Logger.info(`COMPLETED DECODING OF RPL FILES DATA`)

  Logger.info(`STARTING SAVING DECODED DATA TO DATABASE`)
  await saveFlights(
    flights.map((flight) => ({ ...flight, cycle: new Date(date) }))
  )
  Logger.info(`COMPLETED SAVING DECODED DATA TO DATABASE`)

  Logger.info(`COMPLETED RPL UPDATE FOR ${date}`)

  Logger.info(`${flights.length} FLIGHTS INSERTED`)
}
