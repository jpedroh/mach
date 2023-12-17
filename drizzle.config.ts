import 'dotenv/config'
import type { Config } from 'drizzle-kit'
import { getEnvironmentVariable } from '@mach/shared/env'

export default {
  schema: './packages/database/src/schema.ts',
  dbCredentials: {
    uri: getEnvironmentVariable('DATABASE_URL'),
  },
  driver: 'mysql2',
} satisfies Config
