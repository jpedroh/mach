import z from 'zod'

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  AISWEB_API_KEY: z.string(),
  AISWEB_API_PASSWORD: z.string(),
})

export const environment = envSchema.parse(process.env)
