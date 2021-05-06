import { NextPage } from 'next'
import React, { useContext } from 'react'
import { GetFlightsQuery } from '../actions/get-flights'
import FlightModal from '../components/flight-modal'
import ResultsLead from '../components/results-lead'
import SearchTable from '../components/search-table'
import { FlightsContext } from '../contexts/FlightsContext'
import BaseLayout from '../layouts/base-layout'
import makeBlankFlight from '../utils/make-blank-flight'

const Search: NextPage = () => {
  const { state, loadFlights } = useContext(FlightsContext)
  const [show, setShow] = React.useState(false)
  const [flight, setFlight] = React.useState(makeBlankFlight())

  const handleClose = () => setShow(false)
  const handleShow = flight => {
    setFlight(flight)
    setShow(true)
  }

  return (
    <BaseLayout>
      <ResultsLead loading={state.loading} count={state.data.count} />
      <SearchTable
        loading={state.loading}
        data={state.data.items}
        count={state.data.count}
        onOffsetChange={offset => loadFlights({ ...state.data.query, offset })}
        onDetailsShow={handleShow}
      />
      <FlightModal show={show} handleClose={handleClose} flight={flight} />
    </BaseLayout>
  )
}

export default Search
