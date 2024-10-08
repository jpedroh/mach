import type { LinksFunction } from '@remix-run/cloudflare'
import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
import { withSentry } from '@sentry/remix'
import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}

export default withSentry(App)
