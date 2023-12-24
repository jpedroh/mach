'use client'

import { ReactNode } from 'react'
import { useFormState } from 'react-dom'
import { runFlightSearchQuery } from './action'
import { ErrorAlert } from './error-alert'

export function SearchForm({ children }: { children: ReactNode }) {
  const [formState, formAction] = useFormState(runFlightSearchQuery, null)

  return (
    <form className="flex flex-col gap-4 w-full max-w-sm" action={formAction}>
      {children}
      {formState?.error && <ErrorAlert>{formState?.error}</ErrorAlert>}
    </form>
  )
}
