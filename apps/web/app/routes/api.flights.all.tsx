import * as Sentry from '@sentry/remix'
import { data } from 'react-router'
import { fetchFlights, fetchFlightsSchema } from '../services/fetch-flights'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/api.flights.all'

export const headers: Route.HeadersFunction = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

export async function loader({ request, context }: Route.LoaderArgs) {
  try {
    const db = makeDatabaseConnectionFromServerContext(context)
    const { searchParams } = new URL(request.url)
    const query = fetchFlightsSchema.safeParse({
      departureIcao: searchParams.getAll('departureIcao'),
      arrivalIcao: searchParams.getAll('arrivalIcao'),
      company: searchParams.getAll('company'),
      aircraftIcaoCode: searchParams.getAll('aircraftIcaoCode'),
      cycle: searchParams.getAll('cycle'),
    })

    if (!query.success) {
      return data({ message: 'Bad Request' }, { status: 400 })
    }

    return data(await fetchFlights(db, query.data))
  } catch (error) {
    Sentry.captureException(error)
    return data({ message: 'Internal server error' }, { status: 500 })
  }
}
