import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: 'Mach' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
})

export { HomePage as default, loader } from '@mach/web-home'
