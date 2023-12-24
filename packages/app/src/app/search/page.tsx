import { Layout, Lead, Link } from '@mach/shared/ui/server'
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
  const query = searchFlightsQuerySchema.safeParse(searchParams)

  if (query.success === false) {
    return (
      <Layout>
        {query.error.flatten().formErrors.map((error) => {
          return <Lead key={error}>{error}</Lead>
        })}
        <Lead>
          <Link href="/">Click here</Link> to make a new search.
        </Lead>
      </Layout>
    )
  }

  return <SearchPage query={query.data} />
}
