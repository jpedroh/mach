import { FlightDetailsModal } from '@mach/web/details/server'

export const runtime = 'edge';

export default async function Page({ params }) {
  return <FlightDetailsModal id={params.id} />
}
