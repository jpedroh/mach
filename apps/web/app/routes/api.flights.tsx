import { data } from 'react-router'
import {
  fetchFlights,
  fetchFlightsSchema,
  paginateSchema,
} from '../services/fetch-flights'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/api.flights'

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
    const paginate = paginateSchema.safeParse(
      Object.fromEntries(searchParams.entries())
    )

    if (!query.success || !paginate.success) {
      return data({ message: 'Bad Request' }, { status: 400 })
    }
    const response = await fetchFlights(db, query.data, paginate.data)

    return data(response)
  } catch (error) {
    console.error(error)
    return data({ message: 'Internal server error' }, { status: 500 })
  }
}
