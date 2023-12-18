import { FlightDetailsModal } from '@mach/web/details/server'

export default async function Page({ params }) {
  return <FlightDetailsModal id={params.id} />
}
