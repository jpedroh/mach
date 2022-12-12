import Link from 'next/link'
import React from 'react'
import FlightsTable from '../../src/components/FlightsTable'
import Lead from '../../src/components/Lead'
import GeneralLayout from '../../src/layouts/GeneralLayout'
import { fetchFlights } from '../../src/services/fetch-flights'

export const revalidate = 0;

export default async function Search({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    console.log("Logging searchparams")
    console.log(searchParams)
    const flights = await fetchFlights(searchParams ?? {});

    if (flights.length === 0) {
        return <GeneralLayout>
            <Lead>
                There are no results for your search.{" "}
                <Link href="/">Click here</Link> to make a new search.
            </Lead>
        </GeneralLayout>
    }

    const getLeadMessage = (count: number) => {
        return count === 1
            ? 'There is a single result for your search.'
            : `There are ${count} results for your search.`
    }

    return (
        <GeneralLayout>
            <Lead>
                {getLeadMessage(flights.length)}{' '}
                <Link href="/">Click here</Link> to make a new search.
            </Lead>

            <FlightsTable items={flights} />
        </GeneralLayout>
    )
}
