import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import getFlights, { GetFlightsQuery } from '../actions/get-flights'
import FlightModal from '../components/flight-modal'
import ResultsLead from '../components/results-lead'
import SearchTable from '../components/search-table'
import BaseLayout from '../layouts/base-layout'

const buildParameters = query => {
  const parameters: GetFlightsQuery = {
    offset: 0,
    limit: 10
  }

  if (query.departureIcao) {
    parameters.departureIcao = query.departureIcao as string
  }
  if (query.arrivalIcao) {
    parameters.arrivalIcao = query.arrivalIcao as string
  }

  return parameters
}

const Search: NextPage = () => {
  const { query } = useRouter()

  const [parameters, setParameters] = React.useState(buildParameters(query))
  const [loading, setLoading] = React.useState(true)
  const [show, setShow] = React.useState(false)
  const [apiResponse, setApiResponse] = React.useState({ count: 0, items: [] })
  const [flight, setFlight] = React.useState<any>({})

  const handleClose = () => setShow(false)
  const handleShow = flight => {
    setFlight(flight)
    setShow(true)
  }

  const loadFlights = async () => {
    try {
      setLoading(true)
      setApiResponse(await getFlights(parameters))
    } catch (error) {
      setApiResponse({ count: 0, items: [] })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadFlights()
  }, [parameters])

  return (
    <BaseLayout>
      <ResultsLead loading={loading} count={apiResponse.count} />
      <SearchTable
        loading={loading}
        data={apiResponse.items}
        count={apiResponse.count}
        onOffsetChange={offset => setParameters({ ...parameters, offset })}
        onDetailsShow={handleShow}
      />
      <FlightModal show={show} handleClose={handleClose} flight={flight} />
    </BaseLayout>
  )
}

export default Search
