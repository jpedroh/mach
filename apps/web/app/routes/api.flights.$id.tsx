import { makeDatabaseConnection } from '@mach/shared-database/connection'
import * as Sentry from '@sentry/remix'
import {
  type HeadersFunction,
  type LoaderFunctionArgs,
  data,
} from 'react-router'
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
      return data({ message: 'Not found' }, { status: 404 })
    }
    return data(flight)
  } catch (error) {
    Sentry.captureException(error)
    return data({ message: 'Internal server error' }, { status: 500 })
  }
}
