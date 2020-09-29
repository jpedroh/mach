import Flight from '@mach/common'
import formatEet from '../utils/format-eet'
import formatFlightRules from '../utils/format-flight-rules'

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

export default getIcaoFpl
