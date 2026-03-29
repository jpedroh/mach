import { runRplCrawler } from '@mach/rpl-crawler'

const date = process.argv[2]
if (!date) {
  throw new Error('Could not retrieve date from process args')
}

runRplCrawler(date)
  .then((returnCode) => {
    process.exit(returnCode)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
