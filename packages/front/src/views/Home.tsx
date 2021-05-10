import { FC } from 'react'
import SearchFlightsForm from '../components/SearchFlightsForm'
import GeneralLayout from '../layouts/GeneralLayout'

const Home: FC = () => {
  return (
    <GeneralLayout>
      <p className={'font-light text-xl'}>
        To begin, fill at least one of the following fields.
      </p>

      <SearchFlightsForm />
    </GeneralLayout>
  )
}

export default Home
