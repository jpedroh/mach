import { SearchPage } from '@mach/web/search'
import { searchFlightsQuerySchema } from '@mach/web/search/server'
import { getAnalyticsClient } from '@mach/web/shared/analytics/server'
import { Link } from '@mach/web/shared/ui'
import { Layout, Lead } from '@mach/web/shared/ui/server'

export const revalidate = 0

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Search({
  searchParams,
}: {
  searchParams?: Record<string, unknown>
}) {
  const query = searchFlightsQuerySchema.safeParse(searchParams)

  const client = getAnalyticsClient()
  client.captureEvent('search', { query })

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
