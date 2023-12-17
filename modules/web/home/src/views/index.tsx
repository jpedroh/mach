import { Layout, Lead } from '@mach/shared/ui/server'

import { fetchCompanies } from '../services/fetch-companies'
import { fetchAircraftIcaoCodes } from '../services/fetch-aircraft-icao-codes'
import { fetchAirports } from '../services/fetch-airports'
import { fetchCycles } from '../services/fetch-cycles'
import { Button, Select } from '@mach/shared/ui'

import styles from './index.module.css'
import { formatAirport } from '../utils/format-airport'

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

      <form className={styles.container} action={'/search'}>
        <div>
          <label htmlFor="cycle">Cycle</label>
          <Select
            options={cyclesOptions}
            name="cycle"
            defaultValue={cyclesOptions[0]}
          />
        </div>

        <div>
          <label htmlFor="departureIcao">Departure ICAO</label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="departureIcao"
          />
        </div>

        <div>
          <label htmlFor="arrivalIcao">Arrival ICAO</label>
          <Select
            options={airports.map((airport) => ({
              value: airport.id,
              label: formatAirport(airport),
            }))}
            name="arrivalIcao"
          />
        </div>

        <div>
          <label htmlFor="company">Company</label>
          <Select
            options={companies.map((company) => ({
              value: company,
              label: company,
            }))}
            name="company"
          />
        </div>

        <div>
          <label htmlFor="aircraftIcaoCode">Aircraft</label>
          <Select
            options={aircraftIcaoCodes.map((aircraftIcaoCode) => ({
              value: aircraftIcaoCode,
              label: aircraftIcaoCode,
            }))}
            name="aircraftIcaoCode"
          />
        </div>

        <section className="flex gap-3 items-center">
          <input type="checkbox" name="onlyCurrent" id="onlyCurrent" />
          <label htmlFor="onlyCurrent">Show only current flights.</label>
        </section>

        <Button type="submit">Search flights</Button>
      </form>
    </Layout>
  )
}
