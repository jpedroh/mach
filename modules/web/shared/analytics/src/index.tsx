'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useLayoutEffect } from 'react'

export function AnalyticsPageViewTracker(): JSX.Element {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // @ts-expect-error window is not defined
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
        query_params: Object.fromEntries(searchParams.entries()),
      })
    }
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      autocapture: false,
      loaded: (posthog) => {
        if (process.env.NODE_ENV !== 'production') posthog.debug()
      },
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export function useAnalyticsClient() {
  function captureEvent<T extends Record<string, unknown>>(
    name: string,
    properties: T
  ): void {
    posthog.capture(name, properties)
  }

  return { captureEvent }
}
