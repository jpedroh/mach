import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import type { AppLoadContext } from 'react-router'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

export type DatabaseConnection = typeof db

export function makeDatabaseConnection(serverContext: AppLoadContext) {
  const url = serverContext.cloudflare.env.TURSO_CONNECTION_URL
  if (url == null) {
    throw new Error('TURSO_CONNECTION_URL is not defined')
  }

  const authToken = serverContext.cloudflare.env.TURSO_AUTH_TOKEN
  if (authToken == null) {
    throw new Error('TURSO_AUTH_TOKEN is not defined')
  }

  return drizzle(createClient({ url, authToken }), { schema })
}
