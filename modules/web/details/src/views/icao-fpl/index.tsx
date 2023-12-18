import { Flight } from '@mach/shared/database'
import { formatEet } from '../../../../search/src/utils/formatEet'
import { formatFlightRules } from '../../../../search/src/utils/formatFlightRules'
import styles from './index.module.css'

type Props = {
  flight: Flight
}

const getIcaoFpl = (flight: Flight) => {
  return [
    `(FPL-${flight.callsign}-${formatFlightRules(flight.flightRules)}S`,
    `-1/${flight.aircraft.icaoCode}/${flight.aircraft.wakeTurbulence}-${flight.aircraft.equipment}/L1B1`,
    `-${flight.departureIcao}${flight.estimatedOffBlockTime}`,
    `-${flight.cruisingSpeed}F${flight.cruisingLevel
      .toString()
      .padStart(3, '0')} ${flight.route}`,
    `-${flight.arrivalIcao}${formatEet(flight.estimatedEnrouteMinutes)}`,
    `-${flight.remarks})`,
  ]
}

export function IcaoFpl({ flight }: Props) {
  return (
    <div className={styles.container}>
      {getIcaoFpl(flight).map((line, key) => (
        <p key={key}>{line}</p>
      ))}
    </div>
  )
}
