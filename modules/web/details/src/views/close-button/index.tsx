'use client'

import { Button } from '@mach/web/shared/ui'
import { useDismissFlightDetailsModal } from '../../hooks/use-dismiss-flight-details-modal'

export function CloseButton() {
  const { dismiss } = useDismissFlightDetailsModal()

  function handlePress() {
    dismiss()
  }

  return (
    <Button variant="danger" onPress={handlePress}>
      Close
    </Button>
  )
}
