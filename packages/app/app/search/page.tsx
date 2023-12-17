import { SearchPage } from '@mach/web/search'
import { searchFlightsQuerySchema } from '@mach/web/search/server'

export const revalidate = 0

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Search({
  searchParams,
}: {
  searchParams?: unknown
}) {
  const query = searchFlightsQuerySchema.parse(searchParams)
  return <SearchPage query={query} />
}
