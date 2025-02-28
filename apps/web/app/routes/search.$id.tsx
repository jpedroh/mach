import { FlightDetailsModal, fetchFlightById } from '@mach/web-details'
import { useNavigate } from 'react-router'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/search.$id'

export async function loader({ params, context }: Route.LoaderArgs) {
  const db = makeDatabaseConnectionFromServerContext(context)
  const flight = await fetchFlightById(db, params.id)
  if (!flight) {
    throw new Error(`Flight with id ${params.id} not found`)
  }
  return { flight }
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate()

  function onDismiss() {
    navigate(-1)
  }

  return <FlightDetailsModal onDismiss={onDismiss} flight={loaderData.flight} />
}
