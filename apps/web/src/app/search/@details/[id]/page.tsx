import { FlightDetailsModal } from '@mach/web/details/server'

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Page({ params }) {
  return <FlightDetailsModal id={params.id} />
}
