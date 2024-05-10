import { makeDatabaseConnection } from '@mach/shared/database'
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import z from 'zod'

export const runtime = 'edge'

const schema = z.object({
  id: z.string().uuid(),
})

export async function loader({ params, context }: LoaderFunctionArgs) {
  const db = makeDatabaseConnection(context)
  const data = schema.safeParse(params)

  if (!data.success) {
    return json(
      { message: 'Not found' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }

  const flight = await db.query.flights.findFirst({
    where: (flights, { eq }) => eq(flights.id, data.data.id),
  })
  if (flight == null) {
    return json(
      { message: 'Not found' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }

  const {
    aircraftIcaoCode,
    aircraftEquipment,
    aircraftWakeTurbulence,
    ...rest
  } = flight

  return json(
    {
      ...rest,
      aircraft: {
        icaoCode: aircraftIcaoCode,
        equipment: aircraftEquipment,
        wakeTurbulence: aircraftWakeTurbulence,
      },
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}
