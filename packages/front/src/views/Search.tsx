import { FC, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import Lead from '../components/Lead'
import GeneralLayout from '../layouts/GeneralLayout'
import styles from './index.module.css'

const getLeadMessage = (count: number) => {
  return count === 1
    ? 'There is a single result for your search.'
    : `There are ${count} results for your search.`
}

const Search: FC = () => {
  const LIMIT = 15
  const [items, setItems] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch(
      'http://mach-api.herokuapp.com/flights?offset=' +
        offset +
        '&limit=' +
        LIMIT
    )
      .then(response => response.json())
      .then(data => {
        setItems(items => [...items, ...data.items])
        setCount(data.count)
      })
  }, [offset])

  return (
    <GeneralLayout>
      <Lead>
        {getLeadMessage(count)} <Link to="/">Click here</Link> to make a new
        search.
      </Lead>

      <InfiniteScroll
        dataLength={items.length}
        next={() => setOffset(offset => offset + LIMIT)}
        hasMore={items.length < count}
        loader={<h4>Loading...</h4>}
      >
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
    </GeneralLayout>
  )
}

export default Search
