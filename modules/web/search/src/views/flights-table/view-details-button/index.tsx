'use client'

import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { Button } from '@mach/web/shared/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ViewDetailsButton({ flightId }: { flightId: string }) {
  const searchParams = useSearchParams()
  const analyticsClient = useAnalyticsClient()

  function handlePress() {
    analyticsClient.captureEvent('view_flight_details_click', { flightId })
  }

  return (
    <Button onPress={handlePress} asChild variant={'primary'}>
      <Link
        className="normal-case"
        href={`/search/${flightId}?${searchParams.toString()}`}
      >
        View Details
      </Link>
    </Button>
  )
}
