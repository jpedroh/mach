import { Layout, Lead } from '@mach/shared/ui/server'

import { Button, Checkbox, FormGroup, Label, Select } from '@mach/shared/ui'
import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCompanies } from '../services/fetch-companies'
import { fetchCycles } from '../services/fetch-cycles'

import { formatAirport } from '../utils/format-airport'
import { SearchForm } from './form'

export async function HomePage() {
  const [cycles, companies, airports, aircraftIcaoCodes] = await Promise.all([
    fetchCycles(),
    fetchCompanies(),
    fetchAirports(),
    fetchAircraftIcaoCodes(),
  ])

  const cyclesOptions = cycles.map((cycle) => {
    return { value: cycle, label: cycle }
  })

  return (
    <Layout>
      <Lead>To begin, fill at least one of the following fields.</Lead>

      <SearchForm>
        <FormGroup>
          <Label>Cycle</Label>
          <Select
            options={cyclesOptions}
            name="cycle"
            defaultValue={cyclesOptions[0]}
          />
        </FormGroup>

        <FormGroup>
          <Label>Departure ICAO</Label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="departureIcao"
          />
        </FormGroup>

        <FormGroup>
          <Label>Arrival ICAO</Label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="arrivalIcao"
          />
        </FormGroup>

        <FormGroup>
          <Label>Company</Label>
          <Select
            options={companies.map((company) => ({
              value: company,
              label: company,
            }))}
            name="company"
          />
        </FormGroup>

        <FormGroup>
          <Label>Aircraft</Label>
          <Select
            options={aircraftIcaoCodes.map((aircraftIcaoCode) => ({
              value: aircraftIcaoCode,
              label: aircraftIcaoCode,
            }))}
            name="aircraftIcaoCode"
          />
        </FormGroup>

        <Checkbox name="onlyCurrent" label="Show only current flights." />

        <Button type="submit">Search flights</Button>
      </SearchForm>
    </Layout>
  )
}
