import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import Button from '../Button'
import FormInput from '../FormInput'
import styles from './index.module.css'

export type SearchFlightsFormFields = { departureIcao: string; arrivalIcao: string }

type Props = {
  onSubmit: (params: Partial<SearchFlightsFormFields>) => void
}

const SearchFlightsForm: FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<SearchFlightsFormFields>({
    arrivalIcao: '',
    departureIcao: ''
  })

  const isSubmitDisabled = form.arrivalIcao.trim().length === 0 && form.departureIcao.trim().length === 0

  const onChange: ChangeEventHandler<HTMLInputElement> = evt => {
    setForm(form => ({
      ...form,
      [evt.target.name]: evt.target.value.toUpperCase()
    }))
  }

  const handleSubmit: FormEventHandler = evt => {
    evt.preventDefault()
    onSubmit({
      ...(form.departureIcao && { departureIcao: form.departureIcao }),
      ...(form.arrivalIcao && { arrivalIcao: form.arrivalIcao })
    })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div>
        <label>Departure ICAO</label>
        <FormInput
          type="text"
          placeholder="SBSP"
          name="departureIcao"
          onChange={onChange}
        />
      </div>

      <div>
        <label>Arrival ICAO</label>
        <FormInput
          type="text"
          placeholder="SBRF"
          name="arrivalIcao"
          onChange={onChange}
        />
      </div>

      <Button type="submit" disabled={isSubmitDisabled}>Search flights</Button>
    </form>
  )
}

export default SearchFlightsForm
