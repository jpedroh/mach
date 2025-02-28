import { FlightDetailsModal, fetchFlightById } from '@mach/web-details'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/search.$id'

export async function loader({ params, context }: Route.LoaderArgs) {
  const db = makeDatabaseConnectionFromServerContext(context)
  return { flight: await fetchFlightById(db, params.id) }
}

export default function Component({
  params,
  loaderData,
}: Route.ComponentProps) {
  return <FlightDetailsModal id={params.id} flight={loaderData.flight} />
}
