import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'
import { AppLoadContext } from '@remix-run/cloudflare'

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

export type DatabaseConnection = typeof db

export function makeDatabaseConnection(serverContext: AppLoadContext) {
  const url = serverContext.env.TURSO_CONNECTION_URL
  if (url == null) {
    throw new Error('TURSO_CONNECTION_URL is not defined')
  }

  const authToken = serverContext.env.TURSO_AUTH_TOKEN
  if (authToken == null) {
    throw new Error('TURSO_AUTH_TOKEN is not defined')
  }

  return drizzle(createClient({ url, authToken }), { schema })
}
