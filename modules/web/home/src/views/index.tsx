import { Layout, Lead } from '@mach/web/shared/ui/server'

import { Checkbox, Select } from '@mach/web/shared/ui'
import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCompanies } from '../services/fetch-companies'
import { fetchCycles } from '../services/fetch-cycles'

import { formatAirport } from '../utils/format-airport'
import { SearchForm } from './form'
import { SubmitButton } from './form/submit-button'

export async function HomePage() {
  const [cycles, companies, airports, aircraftIcaoCodes] = await Promise.all([
    fetchCycles(),
    fetchCompanies(),
    fetchAirports(),
    fetchAircraftIcaoCodes(),
  ])

  return (
    <Layout>
      <Lead>To begin, fill at least one of the following fields.</Lead>

      <SearchForm>
        <Select
          label={'Cycle'}
          name="cycle"
          defaultItems={cycles.map((cycle) => ({ id: cycle, name: cycle }))}
          defaultSelectedKey={cycles[0]}
        />

        <Select
          label={'Departure ICAO'}
          name="departureIcao"
          defaultItems={airports.map((airport) => ({
            id: airport.id,
            name: formatAirport(airport),
          }))}
        />

        <Select
          label={'Arrival ICAO'}
          name="arrivalIcao"
          defaultItems={airports.map((airport) => ({
            id: airport.id,
            name: formatAirport(airport),
          }))}
        />

        <Select
          label={'Company'}
          name="company"
          defaultItems={companies.map((company) => ({
            id: company,
            name: company,
          }))}
        />

        <Select
          label={'Aircraft'}
          name="aircraftIcaoCode"
          defaultItems={aircraftIcaoCodes.map((aircraftIcaoCode) => ({
            id: aircraftIcaoCode,
            name: aircraftIcaoCode,
          }))}
        />

        <Checkbox name="onlyCurrent" label="Show only current flights." />

        <SubmitButton>Search flights</SubmitButton>
      </SearchForm>
    </Layout>
  )
}
