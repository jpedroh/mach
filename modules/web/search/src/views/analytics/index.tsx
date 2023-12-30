'use client'

import { useEffect } from 'react'
import { SearchFlightsQuery } from '../../services/fetch-flights'
import posthog from 'posthog-js'

export function SearchAnalytics({ query }: { query: SearchFlightsQuery }) {
  useEffect(() => {
    posthog.capture('search', { ...query, cycle: query.cycle?.toString() })
  }, [query])

  return null
}
