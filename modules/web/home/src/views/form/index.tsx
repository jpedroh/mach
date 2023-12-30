'use client'

import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { FormEvent, ReactNode } from 'react'
import { useFormState } from 'react-dom'
import { runFlightSearchQuery } from './action'
import { ErrorAlert } from './error-alert'

export function SearchForm({ children }: { children: ReactNode }) {
  const [formState, formAction] = useFormState(runFlightSearchQuery, null)
  const analyticsClient = useAnalyticsClient()

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    // @ts-expect-error FormData takes no argument
    const payload = new FormData(evt.target as HTMLFormElement)
    analyticsClient.captureEvent('search_flights_click', {
      filters: {
        cycle: payload.get('cycle'),
        departureIcao: payload.get('departureIcao'),
        arrivalIcao: payload.get('arrivalIcao'),
        company: payload.get('company'),
        aircraftIcaoCode: payload.get('aircraftIcaoCode'),
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm"
      action={formAction}
    >
      {children}
      {formState?.error && <ErrorAlert>{formState?.error}</ErrorAlert>}
    </form>
  )
}
