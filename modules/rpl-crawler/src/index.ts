import flightParser from './flight-parser'
import { makeRunRplCrawler } from './main'
import rplFileDownloader from './rpl-file-downloader'
import rplFileLinesExtractor from './rpl-file-lines-extractor'
import saveData from './save-data'
import updateChecker from './update-checker'

export const runRplCrawler = makeRunRplCrawler({
  updateChecker,
  rplFileDownloader,
  rplFileLinesExtractor,
  flightParser,
  saveData,
})
