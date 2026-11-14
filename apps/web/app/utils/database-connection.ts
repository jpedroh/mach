import { makeDatabaseConnection } from '@mach/shared-database/connection'
import type { RouterContextProvider } from 'react-router'

import { cloudflareContext } from './cloudflare-context'

export function makeDatabaseConnectionFromServerContext(serverContext: RouterContextProvider) {
  const { cloudflare } = serverContext.get(cloudflareContext)
  const url = cloudflare.env.TURSO_CONNECTION_URL
  if (url == null) {
    throw new Error('TURSO_CONNECTION_URL is not defined')
  }

  const authToken = cloudflare.env.TURSO_AUTH_TOKEN
  if (authToken == null) {
    throw new Error('TURSO_AUTH_TOKEN is not defined')
  }

  return makeDatabaseConnection({ url, authToken })
}
