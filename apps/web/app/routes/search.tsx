import {
  fetchFlights,
  ErrorBoundary as SearchErrorBoundary,
  SearchPage,
  searchFlightsQuerySchema,
} from '@mach/web-search'
import { href, Outlet, useNavigate, useSearchParams } from 'react-router'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/search'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Mach - Search' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const query = searchFlightsQuerySchema.parse(
    Object.fromEntries(url.searchParams.entries())
  )
  const db = makeDatabaseConnectionFromServerContext(context)
  return { flights: await fetchFlights(db, query) }
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function onViewDetails(id: string) {
    navigate(`${href('/search/:id', { id })}?${searchParams.toString()}`)
  }

  return (
    <>
      <SearchPage flights={loaderData.flights} onViewDetails={onViewDetails} />
      <Outlet />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorMessage =
    error instanceof Error ? error.message : 'Internal server error'
  return <SearchErrorBoundary message={errorMessage}></SearchErrorBoundary>
}
