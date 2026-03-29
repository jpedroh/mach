import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()

const TURSO_CONNECTION_URL = process.env.TURSO_CONNECTION_URL
if (!TURSO_CONNECTION_URL) {
  throw new Error('Variable TURSO_CONNECTION_URL is missing')
}
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN
if (!TURSO_AUTH_TOKEN) {
  throw new Error('Variable TURSO_AUTH_TOKEN is missing')
}

export default defineConfig({
  schema: './modules/shared-database/src/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: TURSO_CONNECTION_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
})
