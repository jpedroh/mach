import { Link } from '@mach/web/shared/ui'
import { Layout, Lead } from '@mach/web/shared/ui/server'
import { SearchFlightsQuery, fetchFlights } from '../services/fetch-flights'
import { FlightsTable } from './flights-table'

type Props = {
  query: SearchFlightsQuery
}

export async function SearchPage({ query }: Props) {
  const flights = await fetchFlights(query)

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

      <FlightsTable flights={flights} />
    </Layout>
  )
}
