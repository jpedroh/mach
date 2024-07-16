import { Flight } from '@mach/shared-database'
import { formatEet } from '../../utils/format-eet'
import { formatFlightRules } from '../../utils/format-flight-rules'
import { twc } from 'react-twc'

type Props = {
  flight: Flight
}

const getIcaoFpl = (flight: Flight) => {
  return [
    `(FPL-${flight.callsign}-${formatFlightRules(flight.flightRules)}S`,
    `-1/${flight.aircraftIcaoCode}/${flight.aircraftWakeTurbulence}-${flight.aircraftEquipment}/L1B1`,
    `-${flight.departureIcao}${flight.estimatedOffBlockTime}`,
    `-${flight.cruisingSpeed}F${flight.cruisingLevel
      .toString()
      .padStart(3, '0')} ${flight.route}`,
    `-${flight.arrivalIcao}${formatEet(flight.estimatedEnrouteMinutes)}`,
    `-${flight.remarks})`,
  ]
}

const Container = twc.div`bg-gray-200 border-gray-300 dark:bg-gray-600 p-3 border dark:border-gray-500 rounded break-words font-mono`

export function IcaoFpl({ flight }: Props) {
  return (
    <Container>
      {getIcaoFpl(flight).map((line, key) => (
        <p key={key}>{line}</p>
      ))}
    </Container>
  )
}
