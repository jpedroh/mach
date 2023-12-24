'use client'

import { Button } from '@mach/shared/ui'
import { useDismissFlightDetailsModal } from '../../hooks/use-dismiss-flight-details-modal'

export function CloseButton() {
  const { dismiss } = useDismissFlightDetailsModal()

  return (
    <Button variant="danger" onClick={dismiss}>
      Close
    </Button>
  )
}
