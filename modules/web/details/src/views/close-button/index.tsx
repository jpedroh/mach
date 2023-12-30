'use client'

import { Flight } from '@mach/shared/database'
import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { Button } from '@mach/web/shared/ui'
import { useDismissFlightDetailsModal } from '../../hooks/use-dismiss-flight-details-modal'

export function CloseButton({ flight }: { flight: Flight }) {
  const { dismiss } = useDismissFlightDetailsModal()
  const analyticsClient = useAnalyticsClient()

  function handlePress() {
    analyticsClient.captureEvent('close_flight_details_click', {
      flightId: flight.id,
    })
    dismiss()
  }

  return (
    <Button variant="danger" onPress={handlePress}>
      Close
    </Button>
  )
}
