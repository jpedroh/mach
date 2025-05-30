import { Links, type LinksFunction, Meta, Outlet, Scripts } from 'react-router'
import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
  return (
    <html lang="en">
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
