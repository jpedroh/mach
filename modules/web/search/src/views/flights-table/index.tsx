import { Button } from '@mach/shared/ui'
import Link from 'next/link'
import { fetchFlights } from '../../services/fetch-flights'
import { formatAirport } from '../../utils/format-airport'
import styles from './index.module.css'

type Props = {
  flights: Awaited<ReturnType<typeof fetchFlights>>
}

function minutesToEet(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}`
}

export function FlightsTable({ flights }: Props) {
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
          {flights.map((flight, key) => (
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
                <Button asChild variant={'primary'}>
                  <Link className='normal-case' href={`/search/${flight.id}`}>
                    View Details
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
