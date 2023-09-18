import GeneralLayout from '../src/layouts/GeneralLayout'
import Lead from '../src/components/Lead'
import SearchFlightsForm from '../src/components/SearchFlightsForm'
import { fetchCompanies } from '../src/services/fetch-companies'
import { fetchAircraftIcaoCodes } from '../src/services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../src/services/fetch-airports'
import { fetchCycles } from '../src/services/fetch-cycles'

export const revalidate = 3600

export const runtime = 'edge'

export const metadata = {
  title: 'Mach',
}

export default async function Page() {
  const [cycles, companies, airports, aircraftIcaoCodes] = await Promise.all([
    fetchCycles(),
    fetchCompanies(),
    fetchAirports(),
    fetchAircraftIcaoCodes(),
  ])

  return (
    <GeneralLayout>
      <Lead>To begin, fill at least one of the following fields.</Lead>
      <SearchFlightsForm
        cycles={cycles}
        airports={airports}
        companies={companies}
        aircraftIcaoCodes={aircraftIcaoCodes}
      />
    </GeneralLayout>
  )
}
