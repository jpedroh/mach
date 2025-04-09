import { data } from 'react-router'
import { fetchFlightById } from '../services/fetch-flight-by-id'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/api.flights.$id'

export const headers: Route.HeadersFunction = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

export async function loader({ params, context }: Route.LoaderArgs) {
  try {
    const db = makeDatabaseConnectionFromServerContext(context)
    const flight = await fetchFlightById(db, params.id ?? '')
    if (flight == null) {
      return data({ message: 'Not found' }, { status: 404 })
    }
    return data(flight)
  } catch (error) {
    console.error(error)
    return data({ message: 'Internal server error' }, { status: 500 })
  }
}
