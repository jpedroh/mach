import { runRplCrawler } from '@mach/rpl-crawler'

const date = process.argv[2]

runRplCrawler(date).catch((error) => {
  console.error(error)
  process.exit(1)
})
