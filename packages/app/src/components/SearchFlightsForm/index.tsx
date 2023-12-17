'use client'

import { ChangeEventHandler, FC, useState } from 'react'
import { Airport } from '@mach/shared/database'
import { formatAirport } from '../../utils/format-airport'
import Button from '../Button'
import { SelectInput } from '../SelectInput'
import styles from './index.module.css'

export type SearchFlightsFormFields = {
  cycle: string
  departureIcao: string
  arrivalIcao: string
  company: string
  aircraftIcaoCode: string
}

type Props = {
  cycles: string[]
  companies: string[]
  aircraftIcaoCodes: string[]
  airports: Airport[]
}

const SearchFlightsForm: FC<Props> = ({
  cycles,
  companies,
  aircraftIcaoCodes,
  airports,
}) => {
  const [form, setForm] = useState<SearchFlightsFormFields>({
    cycle: cycles[0],
    arrivalIcao: '',
    departureIcao: '',
    company: '',
    aircraftIcaoCode: '',
  })

  const isSubmitDisabled =
    form.arrivalIcao.trim().length === 0 &&
    form.departureIcao.trim().length === 0 &&
    form.company.length === 0 &&
    form.aircraftIcaoCode.length === 0

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
    evt
  ) => {
    setForm((form) => ({
      ...form,
      [evt.target.name]: evt.target.value.toUpperCase(),
    }))
  }

  const airportsOptions = airports.map((airport) => {
    return { value: airport.id, label: formatAirport(airport) }
  })

  const cyclesOptions = cycles.map((cycle) => {
    return { value: cycle, label: cycle }
  })

  return (
    <form className={styles.container} action={'/search'}>
      <div>
        <label htmlFor="cycle">Cycle</label>
        <SelectInput
          options={cyclesOptions}
          name="cycle"
          defaultValue={cyclesOptions[0]}
          onChange={(cycle) => setForm((form) => ({ ...form, cycle }))}
        />
      </div>

      <div>
        <label htmlFor="departureIcao">Departure ICAO</label>
        <SelectInput
          options={airportsOptions}
          name="departureIcao"
          onChange={(departureIcao) =>
            setForm((form) => ({ ...form, departureIcao }))
          }
        />
      </div>

      <div>
        <label htmlFor="arrivalIcao">Arrival ICAO</label>
        <SelectInput
          options={airportsOptions}
          name="arrivalIcao"
          onChange={(arrivalIcao) =>
            setForm((form) => ({ ...form, arrivalIcao }))
          }
        />
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <select
          name="company"
          id="company"
          value={form.company}
          onChange={onChange}
        >
          <option value="" disabled>
            Pick a company
          </option>
          {companies.map((company) => {
            return (
              <option key={company} value={company}>
                {company}
              </option>
            )
          })}
        </select>
      </div>

      <div>
        <label htmlFor="aircraftIcaoCode">Aircraft</label>
        <select
          name="aircraftIcaoCode"
          id="aircraftIcaoCode"
          value={form.aircraftIcaoCode}
          onChange={onChange}
        >
          <option value="" disabled>
            Pick an Aircraft
          </option>
          {aircraftIcaoCodes.map((aircraftIcaoCode) => {
            return (
              <option key={aircraftIcaoCode} value={aircraftIcaoCode}>
                {aircraftIcaoCode}
              </option>
            )
          })}
        </select>
      </div>

      <section className="flex gap-3 items-center">
        <input type="checkbox" name="onlyCurrent" id="onlyCurrent" />
        <label htmlFor="onlyCurrent">Show only current flights.</label>
      </section>

      <Button type="submit" disabled={isSubmitDisabled}>
        Search flights
      </Button>
    </form>
  )
}

export default SearchFlightsForm
