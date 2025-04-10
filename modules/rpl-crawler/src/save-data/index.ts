import { makeDatabaseConnection } from '@mach/shared-database/connection'
import makeSaveData from './save-data'

export default makeSaveData({
  db: makeDatabaseConnection({
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  }),
})
