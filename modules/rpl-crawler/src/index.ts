import flightParser from './flight-parser/index.ts'
import { makeRunRplCrawler } from './main.ts'
import rplFileDownloader from './rpl-file-downloader/index.ts'
import rplFileLinesExtractor from './rpl-file-lines-extractor/index.ts'
import saveData from './save-data/index.ts'
import updateChecker from './update-checker/index.ts'

export const runRplCrawler = makeRunRplCrawler({
  updateChecker,
  rplFileDownloader,
  rplFileLinesExtractor,
  flightParser,
  saveData,
})
