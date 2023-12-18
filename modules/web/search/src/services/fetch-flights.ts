import { db } from '@mach/shared/database'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'
import { z } from 'zod'

export const searchFlightsQuerySchema = z.object({
  cycle: z
    .string()
    .transform((v) => new Date(v))
    .optional(),
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

export type SearchFlightsQuery = z.infer<typeof searchFlightsQuerySchema>

export async function fetchFlights(where: SearchFlightsQuery) {
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
      aircraft: true,
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
          ? sql`${fields.aircraft}->>"$.icaoCode" = ${where.aircraftIcaoCode}`
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
