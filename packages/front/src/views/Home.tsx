import { FC, useState } from 'react'
import Lead from '../components/Lead'
import SearchFlightsForm, {
  SearchFlightsFormHandler
} from '../components/SearchFlightsForm'
import GeneralLayout from '../layouts/GeneralLayout'

const Home: FC = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit: SearchFlightsFormHandler = params => {
    try {
      setError('')
      setLoading(true)

      if (!params.departureIcao && !params.arrivalIcao) {
        throw new Error('You must fill at least one field.')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GeneralLayout>
      <Lead>To begin, fill at least one of the following fields.</Lead>
      <SearchFlightsForm onSubmit={onSubmit} loading={loading} error={error} />
    </GeneralLayout>
  )
}

export default Home
