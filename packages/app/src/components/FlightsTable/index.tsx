"use client"

import Flight from '@mach/common'
import { FC, useState } from 'react'
import { Airport } from '../../services/fetch-airports'
import { formatAirport } from '../../utils/format-airport'
import Button from '../Button'
import FlightModal from '../FlightModal'
import styles from './index.module.css'

type Props = {
  items: Array<Flight & { departure: Airport, arrival: Airport }>
}

const FlightsTable: FC<Props> = ({ items }) => {
  const [flight, setFlight] = useState<Flight>();
  const showModal = flight !== undefined;

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
              <th className="grid justify-items-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((flight, key) => (
              <tr key={key}>
                <td>{flight.callsign}</td>
                <td><abbr title={formatAirport(flight.departure)}>{flight.departureIcao}</abbr></td>
                <td><abbr title={formatAirport(flight.arrival)}>{flight.arrivalIcao}</abbr></td>
                <td>{flight.estimatedOffBlockTime}</td>
                <td>{flight.aircraft.icaoCode}</td>
                <td className="grid justify-items-center">
                  <Button
                    variant={'primary'}
                    onClick={() => setFlight(flight)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      <FlightModal
        flight={flight!}
        show={showModal}
        onClose={() => setFlight(undefined)}
      />
    </div>
  )
}

export default FlightsTable
