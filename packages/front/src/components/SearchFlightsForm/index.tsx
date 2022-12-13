"use client"

import { ChangeEventHandler, FC, useState } from 'react'
import Button from '../Button'
import FormInput from '../FormInput'
import styles from './index.module.css'

export type SearchFlightsFormFields = { departureIcao: string; arrivalIcao: string, company: string }

type Props = {
  companies: string[]
}

const SearchFlightsForm: FC<Props> = ({ companies }) => {
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

  return (
    <form className={styles.container} action={"/search"}>
      <div>
        <label htmlFor="departureIcao">Departure ICAO</label>
        <FormInput
          type="text"
          placeholder="SBSP"
          id="departureIcao"
          name="departureIcao"
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="arrivalIcao">Arrival ICAO</label>
        <FormInput
          type="text"
          placeholder="SBRF"
          id="arrivalIcao"
          name="arrivalIcao"
          onChange={onChange}
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
