import flightDecoder from './flight-decoder'
import rplFileDownloader from './rpl-file-downloader'
import rplFileLinesExtractor from './rpl-file-lines-extractor'
import saveFlights from './save-flights'
import Flight from '@mach/common'
import updateChecker from './update-checker'
import Logger from './utils/logger'

type MainDependencies = {
  updateChecker: (date: string) => Promise<boolean>
  rplFileDownloader: (fir: string, date: string) => Promise<Buffer>
  rplFileLinesExtractor: (file: Buffer) => string[]
  flightDecoder: (line: string) => Flight
  saveFlights: (flights: Flight[]) => Promise<void>
}

const main = async (
  args: string[],
  {
    updateChecker,
    rplFileDownloader,
    rplFileLinesExtractor,
    flightDecoder,
    saveFlights
  }: MainDependencies
) => {
  try {
    const firs = args[2].split(',')
    const date = args[3]

    Logger.info(`CHECKING IF EXISTS UPDATES FOR ${date}`)
    const hasUpdate = await updateChecker(date)
    if (!hasUpdate) {
      Logger.info(`NO UPDATES FOUND FOR ${date}`)
      process.exit(0)
    }

    Logger.info(`STARTING RPL UPDATE FOR ${date}`)

    Logger.info(`STARTING RPL FILES DOWNLOAD`)
    const files = await Promise.all(
      firs.map(async fir => {
        Logger.info(`STARTING DOWNLOAD OF RPL FILE FOR ${fir}`)
        const file = await rplFileDownloader(fir, date)
        Logger.info(`COMPLETED DOWNLOAD OF RPL FILE FOR ${fir}`)
        return file
      })
    )
    Logger.info(`COMPLETED RPL FILES DOWNLOAD`)

    Logger.info(`STARTING LINES EXTRACTION FROM RPL FILES`)
    const filesLines = new Set(
      files.reduce((carry, file) => {
        const lines = rplFileLinesExtractor(file)
        return carry.concat(lines)
      }, [] as string[])
    )
    Logger.info(`COMPLETED LINES EXTRACTION FROM RPL FILES`)

    Logger.info(`STARTING DECODING OF RPL FILES DATA`)
    const flights = Array.from(filesLines).map(rawFlight => {
      try {
        return flightDecoder(rawFlight);
      } catch (error) {
        Logger.info(`ERROR WHEN PARSING FLIGHT: ${rawFlight}`);
      }
    }).filter(Boolean) as Flight[];
    Logger.info(`COMPLETED DECODING OF RPL FILES DATA`)

    Logger.info(`STARTING SAVING DECODED DATA TO DATABASE`)
    await saveFlights(flights)
    Logger.info(`COMPLETED SAVING DECODED DATA TO DATABASE`)

    Logger.info(`COMPLETED RPL UPDATE FOR ${date}`)

    Logger.info(`${flights.length} FLIGHTS INSERTED`)
  } catch (error) {
    Logger.error(error.message)
    process.exit(1)
  }
}

main(process.argv, {
  updateChecker,
  rplFileDownloader,
  rplFileLinesExtractor,
  flightDecoder,
  saveFlights
})
