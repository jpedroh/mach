import { Button } from '@mach/web-shared-ui/button'
import { Checkbox } from '@mach/web-shared-ui/checkbox'
import { Layout } from '@mach/web-shared-ui/layout'
import { Lead } from '@mach/web-shared-ui/lead'
import { Select } from '@mach/web-shared-ui/select'
import { Suspense, useState } from 'react'
import { Await, Form } from 'react-router'
import {
  fetchAircraftIcaoCodes,
  fetchAirports,
  fetchCompanies,
  fetchCycles,
} from '../services'
import { searchFlightsQuerySchema } from '../services/validate-search-filters'
import { formatAirport } from '../utils/format-airport'

type Props = {
  cycles: ReturnType<typeof fetchCycles>
  companies: ReturnType<typeof fetchCompanies>
  airports: ReturnType<typeof fetchAirports>
  aircraftIcaoCodes: ReturnType<typeof fetchAircraftIcaoCodes>
}

export function HomePage({
  cycles: cyclesPromise,
  companies: companiesPromise,
  airports: airportsPromise,
  aircraftIcaoCodes: aircraftIcaoCodesPromise,
}: Props) {
  const [errorMessage, setErrorMessage] = useState('')

  function validateForm(evt: React.FormEvent<HTMLFormElement>) {
    setErrorMessage('')
    const data = new FormData(evt.currentTarget)
    const validation = searchFlightsQuerySchema.safeParse(
      Object.fromEntries(data.entries())
    )
    if (validation.error) {
      setErrorMessage(validation.error.issues.at(0)?.message)
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
          <Await resolve={cyclesPromise}>
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

          <Await resolve={airportsPromise}>
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

          <Await resolve={companiesPromise}>
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

          <Await resolve={aircraftIcaoCodesPromise}>
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
