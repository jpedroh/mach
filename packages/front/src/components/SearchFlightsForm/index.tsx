import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import Alert from '../Alert'
import Button from '../Button'
import FormInput from '../FormInput'
import styles from './index.module.css'

export type SearchFlightsFormHandler = (
  params: Partial<{ departureIcao: string; arrivalIcao: string }>
) => void

type Props = {
  onSubmit: SearchFlightsFormHandler
  loading: boolean
  error: string
}

const SearchFlightsForm: FC<Props> = ({ onSubmit, loading, error }) => {
  const [form, setForm] = useState(
    {} as Partial<{ departureIcao: string; arrivalIcao: string }>
  )

  const onChange: ChangeEventHandler<HTMLInputElement> = evt => {
    setForm(form => ({ ...form, [evt.target.name]: evt.target.value }))
  }

  const handleSubmit: FormEventHandler = evt => {
    evt.preventDefault()
    onSubmit(form)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {error ? <Alert>{error}</Alert> : ''}

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

      <Button type="submit" disabled={loading}>
        {loading ? 'Loading' : 'Search flights'}
      </Button>
    </form>
  )
}

export default SearchFlightsForm
