import { makeDatabaseConnection } from '@mach/shared-database/connection'
import makeSaveData from './save-data.ts'

const TURSO_CONNECTION_URL = process.env.TURSO_CONNECTION_URL
if (!TURSO_CONNECTION_URL) {
  throw new Error('Could not find env variable TURSO_CONNECTION_URL')
}
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN
if (!TURSO_AUTH_TOKEN) {
  throw new Error('Could not find env variable TURSO_AUTH_TOKEN')
}

export default makeSaveData({
  db: makeDatabaseConnection({
    url: TURSO_CONNECTION_URL,
    authToken: TURSO_AUTH_TOKEN,
  }),
})
