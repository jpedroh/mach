import { Layout, Lead } from '@mach/shared/ui/server'

import { fetchCompanies } from '../services/fetch-companies'
import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCycles } from '../services/fetch-cycles'
import { Button, Select } from '@mach/shared/ui'

import { formatAirport } from '../utils/format-airport'
import { SearchForm } from './form'
import { ComponentProps, ReactNode, useId } from 'react'

function Label({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<'label'>) {
  return (
    <label className="dark:text-gray-200" {...rest}>
      {children}
    </label>
  )
}

function FormGroup({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className="grid gap-2" {...rest}>
      {children}
    </div>
  )
}

function Checkbox({
  label,
  ...rest
}: { label: ReactNode } & ComponentProps<'input'>) {
  const id = useId()

  return (
    <div className="flex gap-3 items-center">
      <input type="checkbox" name="onlyCurrent" id={id} {...rest} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

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
          <Label htmlFor="cycle">Cycle</Label>
          <Select
            options={cyclesOptions}
            name="cycle"
            defaultValue={cyclesOptions[0]}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="departureIcao">Departure ICAO</Label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="departureIcao"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="arrivalIcao">Arrival ICAO</Label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="arrivalIcao"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="company">Company</Label>
          <Select
            options={companies.map((company) => ({
              value: company,
              label: company,
            }))}
            name="company"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="aircraftIcaoCode">Aircraft</Label>
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
