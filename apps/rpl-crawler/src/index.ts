import { runRplCrawler } from '@mach/rpl-crawler'
import * as Sentry from '@sentry/node'

const date = process.argv[2]

Sentry.init({
  dsn: process.env.RPL_CRAWLER_SENTRY_DSN,
  release: process.env.RPL_CRAWLER_SENTRY_RELEASE,
  environment: process.env.RPL_CRAWLER_SENTRY_ENVIRONMENT,
})

runRplCrawler(date).catch((error) => {
  Sentry.captureException(error)
  console.error(error)
  process.exit(1)
})
