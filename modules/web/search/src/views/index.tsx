import { Link } from '@mach/web/shared/ui'
import { Layout, Lead } from '@mach/web/shared/ui'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Outlet, useLoaderData } from '@remix-run/react'
import { serverOnly$ } from 'vite-env-only'
import {
  fetchFlights,
  searchFlightsQuerySchema,
} from '../services/fetch-flights'
import { FlightsTable } from './flights-table'

export const loader = serverOnly$(({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const query = searchFlightsQuerySchema.parse(
    Object.fromEntries(url.searchParams.entries())
  )
  return fetchFlights(query)
})

export function SearchPage() {
  const flights = useLoaderData<typeof loader>()

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
      <Outlet />
    </Layout>
  )
}
