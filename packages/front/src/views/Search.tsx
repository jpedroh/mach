import { FC, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  useEffect(() => {
    if (offset === 0) {
      return
    }
    loadFlights({ ...state.query, offset })
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
      />
    </GeneralLayout>
  )
}

export default Search
