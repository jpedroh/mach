'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { searchFlightsQuerySchema } from '../../services/validate-search-filters'

export function SearchForm({ children }: { children: ReactNode }) {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    setErrorMessage('')
    const result = searchFlightsQuerySchema.safeParse(
      // @ts-expect-error Broken typing for FomrData
      Object.fromEntries(new FormData(evt.currentTarget))
    )
    if (!result.success) {
      return setErrorMessage(result.error.flatten().formErrors[0])
    }
    router.push('/search?' + new URLSearchParams(result.data).toString())
  }

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm"
      onSubmit={(evt) => onSubmit(evt)}
    >
      {children}
      {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}
    </form>
  )
}

function ErrorAlert({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="bg-red-700 text-white border border-red-900 p-3 rounded"
    >
      {children}
    </p>
  )
}
