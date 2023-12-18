'use client'

import { Button } from '@mach/shared/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ViewDetailsButton({ flightId }: { flightId: string }) {
  const searchParams = useSearchParams()

  return (
    <Button asChild variant={'primary'}>
      <Link
        className="normal-case"
        href={`/search/${flightId}?${searchParams.toString()}`}
      >
        View Details
      </Link>
    </Button>
  )
}
