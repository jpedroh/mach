import { z } from 'zod'

export const environment = z
  .object({
    AISWEB_API_KEY: z.string(),
    AISWEB_API_PASSWORD: z.string(),
  })
  .parse(process.env)
