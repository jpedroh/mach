'use client'

import { Modal } from '@mach/shared/ui'
import { ReactNode } from 'react'
import { useDismissFlightDetailsModal } from '../hooks/use-dismiss-flight-details-modal'

export function ModalWrapper({ children }: { children: ReactNode }) {
  const { dismiss } = useDismissFlightDetailsModal()

  return (
    <Modal isOpen isDismissable onOpenChange={dismiss}>
      {children}
    </Modal>
  )
}
