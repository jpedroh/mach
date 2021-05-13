import Flight from '@mach/common'
import { formatEet } from '../../utils/formatEet'
import { formatFlightRules } from '../../utils/formatFlightRules'
import styles from './index.module.css'

type Props = {
  flight: Flight
}

const getIcaoFpl = (flight: Flight): string => {
  return [
    `(FPL-${flight.callsign}-${formatFlightRules(flight.flightRules)}S`,
    `-1/${flight.aircraft.icaoCode}/${flight.aircraft.wakeTurbulence}-${flight.aircraft.equipment}/L1B1`,
    `-${flight.arrivalIcao}${flight.estimatedOffBlockTime}`,
    `-${flight.cruisingSpeed}F${flight.cruisingLevel} ${flight.route}`,
    `-${flight.arrivalIcao}${formatEet(flight.estimatedEnrouteMinutes)}`,
    `-${flight.remarks})`
  ].join('\n')
}

const IcaoFpl: React.FC<Props> = ({ flight }) => {
  return (
    <pre className={styles.container}>
      <p>{getIcaoFpl(flight)}</p>
    </pre>
  )
}

export default IcaoFpl
