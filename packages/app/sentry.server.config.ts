// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { getEnvironmentVariable } from '@mach/shared/env'
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: getEnvironmentVariable('NEXT_PUBLIC_SENTRY_DSN'),
  release: getEnvironmentVariable('NEXT_PUBLIC_SENTRY_RELEASE'),
  environment: getEnvironmentVariable('NEXT_PUBLIC_SENTRY_ENVIRONMENT'),

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.001,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
