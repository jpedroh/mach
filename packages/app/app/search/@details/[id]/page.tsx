import { FlightModal } from 'modules/web/search/src/views/FlightsTable/FlightModal'

export default async function Page({ params }) {
  return <FlightModal id={params.id} />
}
