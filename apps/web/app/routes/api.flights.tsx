import { makeDatabaseConnection } from '@mach/shared-database'
import {
  type HeadersFunction,
  type LoaderFunctionArgs,
  data,
} from 'react-router'
import * as Sentry from '@sentry/remix'
import {
  fetchFlights,
  fetchFlightsSchema,
  paginateSchema,
} from '../services/fetch-flights'

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
    const paginate = paginateSchema.safeParse(
      Object.fromEntries(searchParams.entries())
    )

    if (!query.success || !paginate.success) {
      return data({ message: 'Bad Request' }, { status: 400 })
    }
    const response = await fetchFlights(db, query.data, paginate.data)

    return data(response)
  } catch (error) {
    Sentry.captureException(error)
    return data({ message: 'Internal server error' }, { status: 500 })
  }
}
