import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: 'Mach' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

export {
  SearchErrorBoundary as ErrorBoundary,
  SearchPage as default,
  loader,
} from '@mach/web/search'
