import { Client } from '@planetscale/database'
import { z } from 'zod'

const credentialsSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
})

const credentials = credentialsSchema.parse(process.env)

export const db = new Client({
  host: credentials.DATABASE_HOST,
  username: credentials.DATABASE_USERNAME,
  password: credentials.DATABASE_PASSWORD,
})
