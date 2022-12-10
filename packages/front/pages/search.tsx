import Flight from '@mach/common'
import { FC, useState } from 'react'
import Link from 'next/link'
import FlightModal from '../src/components/FlightModal'
import FlightsTable from '../src/components/FlightsTable'
import Lead from '../src/components/Lead'
import { useExtractFlightParameters } from '../src/hooks/use-extract-flight-parameters'
import { useFlightsQuery } from '../src/hooks/use-flights-query'
import GeneralLayout from '../src/layouts/GeneralLayout'

const getLeadMessage = (count: number) => {
    return count === 1
        ? 'There is a single result for your search.'
        : `There are ${count} results for your search.`
}

const Search: FC = () => {
    const flightsParameters = useExtractFlightParameters();
    const query = useFlightsQuery(flightsParameters);
    const [flight, setFlight] = useState<Flight>();

    const showModal = flight !== undefined;

    if (query.totalItems === 0 && query.isSuccess) {
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
                {getLeadMessage(query.totalItems)}{' '}
                <Link href="/">Click here</Link> to make a new search.
            </Lead>

            <FlightsTable
                items={query.data}
                next={() => query.fetchNextPage()}
                count={query.totalItems}
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

export default Search
