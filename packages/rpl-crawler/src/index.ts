import flightDecoder from './flight-decoder'
import { runRplCrawler } from './main'
import rplFileDownloader from './rpl-file-downloader'
import rplFileLinesExtractor from './rpl-file-lines-extractor'
import saveData from './save-data'
import updateChecker from './update-checker'
import Logger from './utils/logger'

const date = process.argv[2]

runRplCrawler(date, {
  updateChecker,
  rplFileDownloader,
  rplFileLinesExtractor,
  flightDecoder,
  saveData,
}).catch((error) => {
  Logger.error(error)
  process.exit(1)
})
