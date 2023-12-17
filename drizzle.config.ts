import 'dotenv/config'
import type { Config } from 'drizzle-kit'
import { getEnvironmentVariable } from './modules/shared/env/src'

export default {
  schema: './packages/database/src/schema.ts',
  dbCredentials: {
    uri: getEnvironmentVariable('DATABASE_URL'),
  },
  driver: 'mysql2',
} satisfies Config
