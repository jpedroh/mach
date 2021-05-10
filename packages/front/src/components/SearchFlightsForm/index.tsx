import { FC } from 'react'
import Button from '../Button'
import FormInput from '../FormInput'
import styles from './index.module.css'

const SearchFlightsForm: FC = () => {
  return (
    <form className={styles.container}>
      <div>
        <label>Departure ICAO</label>
        <FormInput type="text" placeholder="SBSP" />
      </div>

      <div>
        <label>Arrival ICAO</label>
        <FormInput type="text" placeholder="SBRF" />
      </div>

      <Button type="submit">Search flights</Button>
    </form>
  )
}

export default SearchFlightsForm
