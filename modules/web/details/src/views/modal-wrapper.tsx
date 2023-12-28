'use client'

import { ModalRoot } from '@mach/web/shared/ui'
import { ReactNode } from 'react'
import { useDismissFlightDetailsModal } from '../hooks/use-dismiss-flight-details-modal'

export function ModalWrapper({ children }: { children: ReactNode }) {
  const { dismiss } = useDismissFlightDetailsModal()

  return (
    <ModalRoot isOpen isDismissable onOpenChange={dismiss}>
      {children}
    </ModalRoot>
  )
}
