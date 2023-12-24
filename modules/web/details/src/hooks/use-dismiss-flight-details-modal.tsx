'use client'

import { useRouter } from 'next/navigation'

export function useDismissFlightDetailsModal() {
  const router = useRouter()

  const dismiss = () => {
    router.back()
  }

  return { dismiss }
}
