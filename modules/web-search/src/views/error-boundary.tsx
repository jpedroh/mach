import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Link } from '@mach/web-shared-ui/link'

export function ErrorBoundary({ message }: { message: string }) {
  return (
    <Layout>
      <Lead>
        <p>{message}</p>
        <Link href="/">Click here</Link> to make a new search.
      </Lead>
    </Layout>
  )
}
