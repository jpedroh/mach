'use client'

import { Flight } from '@mach/shared/database'
import { FC, useState } from 'react'
import { Airport } from '@mach/shared/database'
import { Button } from '@mach/shared/ui'
import styles from './index.module.css'
import { formatAirport } from '../../utils/format-airport'
import FlightModal from './FlightModal'

type Props = {
  items: Array<Flight & { departure?: Airport; arrival?: Airport }>
}

function minutesToEet(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}`
}

const FlightsTable: FC<Props> = ({ items }) => {
  const [flight, setFlight] = useState<Flight>()
  const showModal = flight !== undefined

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>EOBT</th>
            <th>EET</th>
            <th>Aircraft</th>
            <th className="grid justify-items-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((flight, key) => (
            <tr key={key}>
              <td>{flight.callsign}</td>
              <td>
                <abbr
                  title={
                    flight.departure
                      ? formatAirport(flight.departure)
                      : undefined
                  }
                >
                  {flight.departureIcao}
                </abbr>
              </td>
              <td>
                <abbr
                  title={
                    flight.arrival ? formatAirport(flight.arrival) : undefined
                  }
                >
                  {flight.arrivalIcao}
                </abbr>
              </td>
              <td>{flight.estimatedOffBlockTime}</td>
              <td>{minutesToEet(flight.estimatedEnrouteMinutes)}</td>
              <td>{flight.aircraft.icaoCode}</td>
              <td className="grid justify-items-center">
                <Button variant={'primary'} onClick={() => setFlight(flight)}>
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
