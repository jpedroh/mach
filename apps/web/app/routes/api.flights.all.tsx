import { makeDatabaseConnection } from '../../../../modules/shared-database/src'
import {
  json,
  type HeadersFunction,
  type LoaderFunctionArgs,
} from '@remix-run/cloudflare'
import * as Sentry from '@sentry/remix'
import { fetchFlights, fetchFlightsSchema } from '../services/fetch-flights'

export const headers: HeadersFunction = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const db = makeDatabaseConnection(context)
    const { searchParams } = new URL(request.url)
    const query = fetchFlightsSchema.safeParse({
      departureIcao: searchParams.getAll('departureIcao'),
      arrivalIcao: searchParams.getAll('arrivalIcao'),
      company: searchParams.getAll('company'),
      aircraftIcaoCode: searchParams.getAll('aircraftIcaoCode'),
      cycle: searchParams.getAll('cycle'),
    })

    if (!query.success) {
      return json({ message: 'Bad Request' }, { status: 400 })
    }

    return json(await fetchFlights(db, query.data))
  } catch (error) {
    Sentry.captureException(error)
    return json({ message: 'Internal server error' }, { status: 500 })
  }
}
