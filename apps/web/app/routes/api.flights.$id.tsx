import { makeDatabaseConnection } from '@mach/shared-database'
import {
  type HeadersFunction,
  LoaderFunctionArgs,
  json,
} from '@remix-run/cloudflare'
import * as Sentry from '@sentry/remix'
import { fetchFlightById } from '../services/fetch-flight-by-id'

export const headers: HeadersFunction = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

export async function loader({ params, context }: LoaderFunctionArgs) {
  try {
    const db = makeDatabaseConnection(context)
    const flight = await fetchFlightById(db, params.id ?? '')
    if (flight == null) {
      return json({ message: 'Not found' }, { status: 404 })
    }
    return json(flight)
  } catch (error) {
    Sentry.captureException(error)
    return json({ message: 'Internal server error' }, { status: 500 })
  }
}
