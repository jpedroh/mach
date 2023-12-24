'use server'

import { redirect } from 'next/navigation'
import { searchFlightsQuerySchema } from '../../services/validate-search-filters'

export async function runFlightSearchQuery(prev: unknown, formData: FormData) {
  const result = searchFlightsQuerySchema.safeParse(
    Object.fromEntries(formData)
  )
  if (!result.success) {
    return { error: result.error.flatten().formErrors[0] }
  }

  return redirect('/search?' + new URLSearchParams(result.data).toString())
}
