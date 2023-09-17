import { db } from '@mach/database'
import z from 'zod'
import { fetchAirportsData } from './fetch-airports'
import { currentCycleSubquery } from '../utils/currentCycleSubquery'

const schema = z.object({
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

export async function fetchFlights(searchParams: Record<string, unknown>) {
  const today = new Date().toISOString().substring(0, 10)

  const where = schema.parse(searchParams)
  const flights = await db.query.flights.findMany({
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

  const icaos = flights.flatMap((flight) => [
    flight.departureIcao,
    flight.arrivalIcao,
  ])

  const airports = await fetchAirportsData(icaos)

  return flights.map((flight) => {
    return {
      ...flight,
      departure: airports.find(
        ({ AeroCode }) => AeroCode === flight.departureIcao
      ),
      arrival: airports.find(({ AeroCode }) => AeroCode === flight.arrivalIcao),
    }
  })
}
