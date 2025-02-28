import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Link } from '@mach/web-shared-ui/link'
import { fetchFlights } from '../services/fetch-flights'
import { FlightsTable } from './flights-table'

type Props = {
  flights: Awaited<ReturnType<typeof fetchFlights>>
  onViewDetails: (id: string) => void
}

export function SearchPage({ flights, onViewDetails }: Props) {
  if (flights.length === 0) {
    return (
      <Layout>
        <Lead>
          There are no results for your search. <Link href="/">Click here</Link>{' '}
          to make a new search.
        </Lead>
      </Layout>
    )
  }

  const getLeadMessage = (count: number) => {
    return count === 1
      ? 'There is a single result for your search.'
      : `There are ${count} results for your search.`
  }

  return (
    <Layout>
      <Lead>
        {getLeadMessage(flights.length)} <Link href="/">Click here</Link> to
        make a new search.
      </Lead>

      <FlightsTable flights={flights} onViewDetails={onViewDetails} />
    </Layout>
  )
}
