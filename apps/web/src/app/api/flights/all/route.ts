import { db } from '@mach/shared/database'
import { NextResponse } from 'next/server'
import z from 'zod'
import { currentCycleSubquery } from '../(utils)/current-cycle-subquery'

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

    const items = (
      await db.query.flights.findMany({
        orderBy: (fields, { desc }) => desc(fields.id),
        where: (fields, { sql, and, eq }) =>
          and(
            data.data.cycle
              ? sql`${fields.cycle} IN ${data.data.cycle}`
              : eq(fields.cycle, currentCycleSubquery),
            data.data.departureIcao &&
              sql`${fields.departureIcao} IN ${data.data.departureIcao}`,
            data.data.arrivalIcao &&
              sql`${fields.arrivalIcao} IN ${data.data.arrivalIcao}`,
            data.data.company && sql`${fields.company} IN ${data.data.company}`,
            data.data.aircraftIcaoCode &&
              sql`${fields.aircraftIcaoCode} IN ${data.data.aircraftIcaoCode}`
          ),
      })
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

    return NextResponse.json(items, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
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
