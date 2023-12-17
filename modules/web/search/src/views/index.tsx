import Link from 'next/link'
import { Layout, Lead } from '@mach/shared/ui/server'
import { fetchFlights } from '../services/fetch-flights'
import FlightsTable from './FlightsTable'

export async function SearchPage({ query }: { query: Record<string, unknown> }) {
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

      <FlightsTable items={flights} />
    </Layout>
  )
}
