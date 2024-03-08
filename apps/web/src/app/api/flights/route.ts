import { db, flights } from '@mach/shared/database'
import { sql, and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import z from 'zod'
import { currentCycleSubquery } from './(utils)/current-cycle-subquery'

export const dynamic = 'force-dynamic'

export const runtime = 'edge'

const schema = z.object({
  departureIcao: z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .transform((values) => values.map((value) => value.toUpperCase()))
    .optional(),
  arrivalIcao: z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .transform((values) => values.map((value) => value.toUpperCase()))
    .optional(),
  company: z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .transform((values) => values.map((value) => value.toUpperCase()))
    .optional(),
  aircraftIcaoCode: z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .transform((values) => values.map((value) => value.toUpperCase()))
    .optional(),
  limit: z.preprocess(
    (x) => (x ? Number(x) : undefined),
    z.number().min(1).default(15)
  ),
  offset: z.preprocess(
    (x) => (x ? Number(x) : undefined),
    z.number().min(0).default(0)
  ),
  cycle: z
    .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
    .optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Array.from(searchParams.entries()).reduce(
      (curr, [key, value]) => {
        return {
          ...curr,
          [key]: curr[key] ? curr[key].concat([value]) : [value],
        }
      },
      {} as Record<string, string[]>
    )
    const data = schema.safeParse(query)

    if (!data.success) {
      return NextResponse.json(
        { message: 'Bad Request' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      )
    }

    const criteria = and(
      data.data.cycle
        ? sql`${flights.cycle} IN ${data.data.cycle}`
        : eq(flights.cycle, currentCycleSubquery),
      data.data.departureIcao &&
        sql`${flights.departureIcao} IN ${data.data.departureIcao}`,
      data.data.arrivalIcao &&
        sql`${flights.arrivalIcao} IN ${data.data.arrivalIcao}`,
      data.data.company && sql`${flights.company} IN ${data.data.company}`,
      data.data.aircraftIcaoCode &&
        sql`${flights.aircraftIcaoCode} IN ${data.data.aircraftIcaoCode}`
    )

    const countResponse = await db
      .select({ count: sql`count(${flights.id})` })
      .from(flights)
      .where(criteria)

    const items = (
      await db
        .select()
        .from(flights)
        .where(criteria)
        .limit(data.data.limit)
        .offset(data.data.offset)
    ).map(
      ({
        aircraftIcaoCode,
        aircraftEquipment,
        aircraftWakeTurbulence,
        ...flight
      }) => {
        return {
          ...flight,
          aircraft: {
            icaoCode: aircraftIcaoCode,
            equipment: aircraftEquipment,
            wakeTurbulence: aircraftWakeTurbulence,
          },
        }
      }
    )

    return NextResponse.json(
      { count: Number(countResponse[0].count), items },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}
