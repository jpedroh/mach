import Flight from '@mach/common'
import { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FlightModal from '../components/FlightModal'
import FlightsTable from '../components/FlightsTable'
import Lead from '../components/Lead'
import { FlightsContext } from '../contexts/FlightsContext'
import GeneralLayout from '../layouts/GeneralLayout'

const getLeadMessage = (count: number) => {
  return count === 1
    ? 'There is a single result for your search.'
    : `There are ${count} results for your search.`
}

const Search: FC = () => {
  const { state, loadFlights, reset } = useContext(FlightsContext)
  const [offset, setOffset] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [flight, setFlight] = useState<Flight>({} as Flight)

  useEffect(() => {
    if (offset === 0) {
      return
    }
    loadFlights({ ...state.query, offset })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  return (
    <GeneralLayout>
      <Lead>
        {getLeadMessage(state.data.count)}{' '}
        <Link onClick={() => reset()} to="/">
          Click here
        </Link>{' '}
        to make a new search.
      </Lead>

      <FlightsTable
        items={state.data.items}
        next={() => setOffset(v => v + state.query.limit)}
        count={state.data.count}
        onButtonClick={flight => {
          setFlight(flight)
          setShowModal(true)
        }}
      />

      <FlightModal
        flight={flight}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </GeneralLayout>
  )
}

export default Search
