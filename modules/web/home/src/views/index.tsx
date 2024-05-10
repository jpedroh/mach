import { Button, Checkbox, Select } from '@mach/web/shared/ui'
import { Layout, Lead } from '@mach/web/shared/ui'
import { Form, useLoaderData } from '@remix-run/react'

import { serverOnly$ } from 'vite-env-only'

import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCompanies } from '../services/fetch-companies'
import { fetchCycles } from '../services/fetch-cycles'
import { formatAirport } from '../utils/format-airport'
import { makeDatabaseConnection } from '@mach/shared/database'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'

export const loader = serverOnly$(({ context }: LoaderFunctionArgs) => {
  const db = makeDatabaseConnection(context)

  return Promise.all([
    fetchCycles(db),
    fetchCompanies(db),
    fetchAirports(db),
    fetchAircraftIcaoCodes(db),
  ])
})

export function HomePage() {
  const [cycles, companies, airports, aircraftIcaoCodes] =
    useLoaderData<typeof loader>()

  return (
    <Layout>
      <Lead>To begin, fill at least one of the following fields.</Lead>

      <Form
        className="flex flex-col gap-4 w-full max-w-sm"
        action="/search"
        method="GET"
      >
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

        <Button type="submit">Search flights</Button>
      </Form>
    </Layout>
  )
}
