import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import Lead from '../components/Lead'
import SearchFlightsForm, { SearchFlightsFormFields } from '../components/SearchFlightsForm'
import GeneralLayout from '../layouts/GeneralLayout'

const Home: FC = () => {
  const history = useHistory()

  const handleSubmit = (params: Partial<SearchFlightsFormFields>) => {
    const urlParams = new URLSearchParams()
    if (params.departureIcao) {
      urlParams.set('departureIcao', params.departureIcao)
    }
    if (params.arrivalIcao) {
      urlParams.set('arrivalIcao', params.arrivalIcao)
    }
    history.push(`/search?${urlParams.toString()}`);
  }

  return (
    <GeneralLayout>
      <Lead>To begin, fill at least one of the following fields.</Lead>
      <SearchFlightsForm onSubmit={handleSubmit} />
    </GeneralLayout>
  )
}

export default Home
