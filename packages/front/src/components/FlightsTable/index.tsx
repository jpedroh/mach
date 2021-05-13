import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.css'

type Props = {
  items: any[]
  next: () => void
  count: number
}

const FlightsTable: FC<Props> = ({ items, next, count }) => {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>EOBT</th>
            <th>Aircraft</th>
            <th>Details</th>
          </tr>
        </thead>
      </table>

      <InfiniteScroll
        dataLength={items.length}
        next={next}
        hasMore={items.length < count}
        loader={<span className={styles.loading}>Loading...</span>}
        height={'50vh'}
      >
        <table className={styles.table}>
          <tbody>
            {items.map((flight, key) => (
              <tr key={key}>
                <td>{flight.callsign}</td>
                <td>{flight.departureIcao}</td>
                <td>{flight.arrivalIcao}</td>
                <td>{flight.estimatedOffBlockTime}</td>
                <td>{flight.aircraft.icaoCode}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  )
}

export default FlightsTable
