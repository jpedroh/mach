import type { DatabaseConnection } from '@mach/shared-database/connection'
import { z } from 'zod'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'

export const searchFlightsQuerySchema = z
  .object({
    cycle: z.string().optional(),
    departureIcao: z
      .string()
      .transform((v) => v.toUpperCase())
      .optional(),
    arrivalIcao: z
      .string()
      .transform((v) => v.toUpperCase())
      .optional(),
    company: z
      .string()
      .transform((v) => v.toUpperCase())
      .optional(),
    aircraftIcaoCode: z
      .string()
      .transform((v) => v.toUpperCase())
      .optional(),
    onlyCurrent: z
      .string()
      .transform((v) => Boolean(v))
      .optional(),
  })
  .refine(
    ({ departureIcao, arrivalIcao, company, aircraftIcaoCode }) => {
      return departureIcao || arrivalIcao || company || aircraftIcaoCode
    },
    {
      message:
        'At least one filter (either departureIcao, arrivalIcao, company or aircraftIcaoCode) must be provided',
    }
  )

export type SearchFlightsQuery = z.infer<typeof searchFlightsQuerySchema>

export async function fetchFlights(
  db: DatabaseConnection,
  where: SearchFlightsQuery
) {
  const today = new Date().toISOString().substring(0, 10)

  return db.query.flights.findMany({
    with: {
      arrival: true,
      departure: true,
    },
    columns: {
      id: true,
      callsign: true,
      estimatedOffBlockTime: true,
      estimatedEnrouteMinutes: true,
      aircraftIcaoCode: true,
    },
    where: (fields, { sql, and, eq, or }) =>
      and(
        where.cycle
          ? eq(fields.cycle, where.cycle)
          : eq(fields.cycle, currentCycleSubquery),
        where.departureIcao
          ? eq(fields.departureIcao, where.departureIcao)
          : undefined,
        where.arrivalIcao
          ? eq(fields.arrivalIcao, where.arrivalIcao)
          : undefined,
        where.company ? eq(fields.company, where.company) : undefined,
        where.aircraftIcaoCode
          ? sql`${fields.aircraftIcaoCode} = ${where.aircraftIcaoCode}`
          : undefined,
        where.onlyCurrent
          ? and(
              sql`${fields.beginDate} <= ${today}`,
              or(
                sql`${fields.endDate} IS NULL`,
                sql`${fields.endDate} >= ${today}`
              )
            )
          : undefined
      ),
  })
}
