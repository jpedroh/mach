import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.css'
import Flight from '@mach/common'
import Button from '../Button'

type Props = {
  items: Flight[]
  next: () => void
  count: number
  onButtonClick: (flight: Flight) => void
}

const FlightsTable: FC<Props> = ({ items, next, count, onButtonClick }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={next}
        hasMore={items.length < count}
        loader={<span className={styles.loading}>Loading...</span>}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Callsign</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>EOBT</th>
              <th>Aircraft</th>
              <th className="grid justify-items-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((flight, key) => (
              <tr key={key}>
                <td>{flight.callsign}</td>
                <td>{flight.departureIcao}</td>
                <td>{flight.arrivalIcao}</td>
                <td>{flight.estimatedOffBlockTime}</td>
                <td>{flight.aircraft.icaoCode}</td>
                <td className="grid justify-items-center">
                  <Button
                    variant={'primary'}
                    onClick={() => onButtonClick(flight)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  )
}

export default FlightsTable
