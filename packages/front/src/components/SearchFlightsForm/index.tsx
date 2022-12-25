"use client"

import { ChangeEventHandler, FC, useState } from 'react'
import { Airport } from '../../services/fetch-airports'
import Button from '../Button'
import FormInput from '../FormInput'
import styles from './index.module.css'
import Select from 'react-select'
import { SelectInput } from '../SelectInput'

export type SearchFlightsFormFields = { departureIcao: string; arrivalIcao: string, company: string }

type Props = {
  companies: string[]
  airports: Airport[]
}

const SearchFlightsForm: FC<Props> = ({ companies, airports }) => {
  const [form, setForm] = useState<SearchFlightsFormFields>({
    arrivalIcao: '',
    departureIcao: '',
    company: ''
  })

  const isSubmitDisabled = form.arrivalIcao.trim().length === 0 && form.departureIcao.trim().length === 0 && form.company.length === 0

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = evt => {
    setForm(form => ({
      ...form,
      [evt.target.name]: evt.target.value.toUpperCase()
    }))
  }

  const airportsOptions = airports.map(airport => {
    return { value: airport.AeroCode, label: `${airport.AeroCode} - ${airport.name} - ${airport.city}` }
  })

  return (
    <form className={styles.container} action={"/search"}>
      <div>
        <label htmlFor="departureIcao">Departure ICAO</label>
        <SelectInput
          options={airportsOptions}
          name="departureIcao"
          onChange={departureIcao => setForm(form => ({ ...form, departureIcao }))}
        />
      </div>

      <div>
        <label htmlFor="arrivalIcao">Arrival ICAO</label>
        <SelectInput
          options={airportsOptions}
          name="arrivalIcao"
          onChange={arrivalIcao => setForm(form => ({ ...form, arrivalIcao }))}
        />
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <select name="company" id="company" value={form.company} onChange={onChange}>
          <option value="" disabled>Pick a company</option>
          {companies.map((company) => {
            return <option key={company} value={company}>{company}</option>
          })}
        </select>
      </div>

      <section className='flex gap-3 items-center'>
        <input type="checkbox" name="onlyCurrent" id="onlyCurrent" />
        <label htmlFor="onlyCurrent">Show only current flights.</label>
      </section>

      <Button type="submit" disabled={isSubmitDisabled}>Search flights</Button>
    </form>
  )
}

export default SearchFlightsForm
