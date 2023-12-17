import Link from 'next/link'
import React from 'react'
import FlightsTable from '../../src/components/FlightsTable'
import { Layout, Lead } from '@mach/shared/ui/server'
import { fetchFlights } from '../../src/services/fetch-flights'

export const revalidate = 0

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const flights = await fetchFlights(searchParams ?? {})

  if (flights.length === 0) {
    return (
      <Layout>
        <Lead>
          There are no results for your search. <Link href="/">Click here</Link>{' '}
          to make a new search.
        </Lead>
      </Layout>
    )
  }

  const getLeadMessage = (count: number) => {
    return count === 1
      ? 'There is a single result for your search.'
      : `There are ${count} results for your search.`
  }

  return (
    <Layout>
      <Lead>
        {getLeadMessage(flights.length)} <Link href="/">Click here</Link> to
        make a new search.
      </Lead>

      <FlightsTable items={flights} />
    </Layout>
  )
}
