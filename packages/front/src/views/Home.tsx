import { FC, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Lead from '../components/Lead'
import SearchFlightsForm from '../components/SearchFlightsForm'
import { FlightsContext } from '../contexts/FlightsContext'
import GeneralLayout from '../layouts/GeneralLayout'

const Home: FC = () => {
  const { state, loadFlights } = useContext(FlightsContext)
  const history = useHistory()

  useEffect(() => {
    if (state.data.count > 0) {
      history.push('/search')
    }
  }, [state.data.count])

  return (
    <GeneralLayout>
      <Lead>To begin, fill at least one of the following fields.</Lead>
      <SearchFlightsForm
        onSubmit={params => loadFlights({ offset: 0, limit: 30, ...params })}
        loading={state.loading}
        error={state.error ? state.error.message : ''}
      />
    </GeneralLayout>
  )
}

export default Home
