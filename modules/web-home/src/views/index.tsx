import { makeDatabaseConnection } from '@mach/shared-database'
import { Button } from '@mach/web-shared-ui/button'
import { Checkbox } from '@mach/web-shared-ui/checkbox'
import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Select } from '@mach/web-shared-ui/select'
import { Await, LoaderFunctionArgs } from 'react-router'
import { Form, useLoaderData } from 'react-router'

import { Suspense, useState } from 'react'
import { serverOnly$ } from 'vite-env-only/macros'

import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCompanies } from '../services/fetch-companies'
import { fetchCycles } from '../services/fetch-cycles'
import { searchFlightsQuerySchema } from '../services/validate-search-filters'
import { formatAirport } from '../utils/format-airport'

export const loader = serverOnly$(({ context }: LoaderFunctionArgs) => {
  const db = makeDatabaseConnection(context)

  return {
    cycles: fetchCycles(db),
    companies: fetchCompanies(db),
    airports: fetchAirports(db),
    aircraftIcaoCodes: fetchAircraftIcaoCodes(db),
  }
})

export function HomePage() {
  const { cycles, companies, airports, aircraftIcaoCodes } =
    useLoaderData<typeof loader>()
  const [errorMessage, setErrorMessage] = useState('')

  function validateForm(evt: React.FormEvent<HTMLFormElement>) {
    setErrorMessage('')
    const data = new FormData(evt.currentTarget)
    const validation = searchFlightsQuerySchema.safeParse(
      Object.fromEntries(data.entries())
    )
    if (validation.error) {
      setErrorMessage(validation.error.errors[0].message)
      evt.preventDefault()
    }
  }

  return (
    <Layout>
      <Suspense fallback={<Lead>Loading...</Lead>}>
        <Lead>To begin, fill at least one of the following fields.</Lead>

        <Form
          className="flex flex-col gap-4 w-full max-w-sm"
          action="/search"
          method="GET"
          onSubmit={validateForm}
        >
          <Await resolve={cycles}>
            {(cycles) => (
              <Select
                label={'Cycle'}
                name="cycle"
                defaultItems={cycles.map((cycle) => ({
                  id: cycle,
                  name: cycle,
                }))}
                defaultSelectedKey={cycles[0]}
              />
            )}
          </Await>

          <Await resolve={airports}>
            {(airports) => (
              <>
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
              </>
            )}
          </Await>

          <Await resolve={companies}>
            {(companies) => (
              <Select
                label={'Company'}
                name="company"
                defaultItems={companies.map((company) => ({
                  id: company,
                  name: company,
                }))}
              />
            )}
          </Await>

          <Await resolve={aircraftIcaoCodes}>
            {(aircraftIcaoCodes) => (
              <Select
                label={'Aircraft'}
                name="aircraftIcaoCode"
                defaultItems={aircraftIcaoCodes.map((aircraftIcaoCode) => ({
                  id: aircraftIcaoCode,
                  name: aircraftIcaoCode,
                }))}
              />
            )}
          </Await>

          <Checkbox name="onlyCurrent" label="Show only current flights." />

          {errorMessage && (
            <p role="alert" className="bg-red-600 text-white p-4">
              {errorMessage}
            </p>
          )}

          <Button type="submit">Search flights</Button>
        </Form>
      </Suspense>
    </Layout>
  )
}
