import type { Config } from "drizzle-kit";

export default {
  schema: "./packages/database/src/schema.ts",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: './drizzle'
} satisfies Config;
