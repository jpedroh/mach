import { FC, useState } from 'react'
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
      <p className={'font-light text-xl'}>
        To begin, fill at least one of the following fields.
      </p>

      <SearchFlightsForm onSubmit={onSubmit} loading={loading} error={error} />
    </GeneralLayout>
  )
}

export default Home
