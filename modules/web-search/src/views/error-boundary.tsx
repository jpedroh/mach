import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Link } from '@mach/web-shared-ui/link'
import { captureRemixErrorBoundaryError } from '@sentry/remix'
import { useRouteError } from 'react-router'

export function SearchErrorBoundary() {
  const error = useRouteError()
  const errorMessage =
    error instanceof Error ? error.message : 'Internal server error'

  captureRemixErrorBoundaryError(error)

  return (
    <Layout>
      <Lead>
        <p>{errorMessage}</p>
        <Link href="/">Click here</Link> to make a new search.
      </Lead>
    </Layout>
  )
}
