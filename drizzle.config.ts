import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: './packages/database/src/schema.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  driver: 'mysql2',
} satisfies Config
