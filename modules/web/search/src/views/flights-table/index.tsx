import { fetchFlights } from '../../services/fetch-flights'
import { formatAirport } from '../../utils/format-airport'
import styles from './index.module.css'
import { ViewDetailsButton } from './view-details-button'

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
                <abbr title={formatAirport(flight.departure)}>
                  {flight.departure.id}
                </abbr>
              </td>
              <td>
                <abbr title={formatAirport(flight.arrival)}>
                  {flight.arrival.id}
                </abbr>
              </td>
              <td>{flight.estimatedOffBlockTime}</td>
              <td>{minutesToEet(flight.estimatedEnrouteMinutes)}</td>
              <td>{flight.aircraft.icaoCode}</td>
              <td className="grid justify-items-center">
                <ViewDetailsButton flightId={flight.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
