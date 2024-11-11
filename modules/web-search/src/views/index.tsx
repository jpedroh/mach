import { makeDatabaseConnection } from '@mach/shared-database'
import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Link } from '@mach/web-shared-ui/link'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Outlet, useLoaderData } from '@remix-run/react'
import { serverOnly$ } from 'vite-env-only/macros'
import {
  fetchFlights,
  searchFlightsQuerySchema,
} from '../services/fetch-flights'
import { FlightsTable } from './flights-table'

export const loader = serverOnly$(
  ({ request, context }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const query = searchFlightsQuerySchema.parse(
      Object.fromEntries(url.searchParams.entries())
    )
    const db = makeDatabaseConnection(context)
    return fetchFlights(db, query)
  }
)

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
