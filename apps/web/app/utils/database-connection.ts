import { makeDatabaseConnection } from '@mach/shared-database/connection'
import type { AppLoadContext } from 'react-router'

export function makeDatabaseConnectionFromServerContext(
  serverContext: AppLoadContext
) {
  const url = serverContext.cloudflare.env.TURSO_CONNECTION_URL
  if (url == null) {
    throw new Error('TURSO_CONNECTION_URL is not defined')
  }

  const authToken = serverContext.cloudflare.env.TURSO_AUTH_TOKEN
  if (authToken == null) {
    throw new Error('TURSO_AUTH_TOKEN is not defined')
  }

  return makeDatabaseConnection({ url, authToken })
}
