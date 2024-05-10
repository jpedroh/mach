import {
  type DatabaseConnection,
  cycles,
  flights,
  Flight,
} from '@mach/shared/database'
import { and, eq, sql } from 'drizzle-orm'
import z from 'zod'

const QUERYABLE_FIELDS = [
  'departureIcao',
  'arrivalIcao',
  'company',
  'aircraftIcaoCode',
  'cycle',
] as const

export const fetchFlightsSchema = z.record(
  z.enum(QUERYABLE_FIELDS),
  z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .transform((values) => values.map((value) => value.toUpperCase()))
    .transform((v) => (v.length == 0 ? undefined : v))
)

export const paginateSchema = z.object({
  limit: z.coerce.number().min(1).default(15),
  offset: z.coerce.number().min(0).default(0),
})

export async function fetchFlights(
  db: DatabaseConnection,
  query: z.infer<typeof fetchFlightsSchema>,
  paginate?: z.infer<typeof paginateSchema>
) {
  const currentCycleSubquery = db
    .select({ cycle: sql<string>`MAX(${cycles.cycle})` })
    .from(cycles)

  const criteria = and(
    query.cycle
      ? sql`${flights.cycle} IN ${query.cycle}`
      : eq(flights.cycle, currentCycleSubquery),
    query.departureIcao &&
      sql`${flights.departureIcao} IN ${query.departureIcao}`,
    query.arrivalIcao && sql`${flights.arrivalIcao} IN ${query.arrivalIcao}`,
    query.company && sql`${flights.company} IN ${query.company}`,
    query.aircraftIcaoCode &&
      sql`${flights.aircraftIcaoCode} IN ${query.aircraftIcaoCode}`
  )

  if (paginate == null) {
    return await db.select().from(flights).where(criteria)
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(${flights.id})` })
    .from(flights)
    .where(criteria)

  const items = await db
    .select()
    .from(flights)
    .where(criteria)
    .limit(paginate.limit)
    .offset(paginate.offset)

  return { count, items: items.map(transformFlight) }
}

function transformFlight(flight: Flight) {
  return {
    ...flight,
    aircraft: {
      icaoCode: flight.aircraftIcaoCode,
      equipment: flight.aircraftEquipment,
      wakeTurbulence: flight.aircraftWakeTurbulence,
    },
  }
}
