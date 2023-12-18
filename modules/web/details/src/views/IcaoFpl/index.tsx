import { Flight } from '@mach/shared/database'
import { formatFlightRules } from '../../utils/format-flight-rules'
import styles from './index.module.css'
import { formatEet } from '../../utils/format-eet'

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

const IcaoFpl: React.FC<Props> = ({ flight }) => {
  return (
    <div className={styles.container}>
      {getIcaoFpl(flight).map((line, key) => (
        <p key={key}>{line}</p>
      ))}
    </div>
  )
}

export default IcaoFpl
