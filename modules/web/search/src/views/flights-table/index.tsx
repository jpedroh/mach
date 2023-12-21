import { fetchFlights } from '../../services/fetch-flights'
import { formatAirport } from '../../utils/format-airport'
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
      <table className={'table-fixed w-full'}>
        <thead className="bg-blue-700 text-white uppercase">
          <tr>
            <th className="font-semibold p-2">Callsign</th>
            <th className="font-semibold p-2">Departure</th>
            <th className="font-semibold p-2">Arrival</th>
            <th className="font-semibold p-2">EOBT</th>
            <th className="font-semibold p-2">EET</th>
            <th className="font-semibold p-2">Aircraft</th>
            <th className="font-semibold p-2">Details</th>
          </tr>
        </thead>
        <tbody className="bg-gray-300 bg-opacity-10 dark:text-white uppercase">
          {flights.map((flight, key) => (
            <tr key={key}>
              <td className="p-2 text-center">{flight.callsign}</td>
              <td className="p-2 text-center">
                <abbr title={formatAirport(flight.departure)}>
                  {flight.departure.id}
                </abbr>
              </td>
              <td className="p-2 text-center">
                <abbr title={formatAirport(flight.arrival)}>
                  {flight.arrival.id}
                </abbr>
              </td>
              <td className="p-2 text-center">
                {flight.estimatedOffBlockTime}
              </td>
              <td className="p-2 text-center">
                {minutesToEet(flight.estimatedEnrouteMinutes)}
              </td>
              <td className="p-2 text-center">{flight.aircraft.icaoCode}</td>
              <td className="p-2 text-center grid">
                <ViewDetailsButton flightId={flight.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
