import { z } from 'zod'

export const searchFlightsQuerySchema = z
  .object({
    cycle: z.string(),
    departureIcao: z.string(),
    arrivalIcao: z.string(),
    company: z.string(),
    aircraftIcaoCode: z.string(),
    onlyCurrent: z.string().optional(),
  })
  .refine(
    ({ departureIcao, arrivalIcao, company, aircraftIcaoCode }) => {
      return departureIcao || arrivalIcao || company || aircraftIcaoCode
    },
    {
      message: 'At least one filter must be provided',
    }
  )
