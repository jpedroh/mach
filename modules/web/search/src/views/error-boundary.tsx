import { Link } from '@mach/web/shared/ui'
import { Layout, Lead } from '@mach/web/shared/ui/server'
import { useRouteError } from '@remix-run/react'

export function SearchErrorBoundary() {
  const error = useRouteError()
  const errorMessage =
    error instanceof Error ? error.message : 'Internal server error'

  return (
    <Layout>
      <Lead>
        <p>{errorMessage}</p>
        <Link href="/">Click here</Link> to make a new search.
      </Lead>
    </Layout>
  )
}
