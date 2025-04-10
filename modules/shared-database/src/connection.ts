import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

export function makeDatabaseConnection({
  url,
  authToken,
}: { url: string; authToken: string }) {
  return drizzle(createClient({ url, authToken }), { schema })
}

export type DatabaseConnection = ReturnType<typeof makeDatabaseConnection>
