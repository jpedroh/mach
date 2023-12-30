import { FlightDetailsModal } from '@mach/web/details/server'
import { getAnalyticsClient } from '@mach/web/shared/analytics/server'

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Page({ params }: { params: { id: string } }) {
  const client = getAnalyticsClient()
  client.captureEvent('view_details', { flight_id: params.id })

  return <FlightDetailsModal id={params.id} />
}
