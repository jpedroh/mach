import {
  fetchAircraftIcaoCodes,
  fetchAirports,
  fetchCompanies,
  fetchCycles,
  HomePage,
} from '@mach/web-home'
import { makeDatabaseConnectionFromServerContext } from '../utils/database-connection'
import type { Route } from './+types/_index'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Mach' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

export const headers: Route.HeadersFunction = () => ({
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
})

export function loader({ context }: Route.LoaderArgs) {
  const db = makeDatabaseConnectionFromServerContext(context)

  return {
    cycles: fetchCycles(db),
    companies: fetchCompanies(db),
    airports: fetchAirports(db),
    aircraftIcaoCodes: fetchAircraftIcaoCodes(db),
  }
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <HomePage {...loaderData} />
}
