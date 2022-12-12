import Flight from '@mach/common'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import FlightModal from '../src/components/FlightModal'
import FlightsTable from '../src/components/FlightsTable'
import Lead from '../src/components/Lead'
import { fetchFlights } from '../src/services/fetch-flights'
import GeneralLayout from '../src/layouts/GeneralLayout'

const getLeadMessage = (count: number) => {
    return count === 1
        ? 'There is a single result for your search.'
        : `There are ${count} results for your search.`
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let query: Record<string, string> = { limit: "15000" };

    if (context.query?.departureIcao) {
        query.departureIcao = context.query?.departureIcao!.toString().toUpperCase();
    }
    if (context.query?.arrivalIcao) {
        query.arrivalIcao = context.query?.arrivalIcao!.toString().toUpperCase();
    }

    const flights = await fetchFlights(query)

    return { props: { flights: flights.items } }
}

export default function Search({ flights }: { flights: Flight[] }) {
    const [flight, setFlight] = useState<Flight>();

    const showModal = flight !== undefined;

    if (flights.length === 0) {
        return <GeneralLayout>
            <Lead>
                There are no results for your search.{" "}
                <Link href="/">Click here</Link> to make a new search.
            </Lead>
        </GeneralLayout>
    }

    return (
        <GeneralLayout>
            <Lead>
                {getLeadMessage(flights.length)}{' '}
                <Link href="/">Click here</Link> to make a new search.
            </Lead>

            <FlightsTable
                items={flights}
                next={() => { }}
                count={flights.length}
                onButtonClick={flight => setFlight(flight)}
            />

            <FlightModal
                flight={flight!}
                show={showModal}
                onClose={() => setFlight(undefined)}
            />
        </GeneralLayout>
    )
}
