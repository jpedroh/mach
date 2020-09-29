import React from 'react'
import Flight, { FlightRules } from '@mach/common'

type IcaoFplProps = {
  flight: Flight
}

const flightRules = (flightRule: FlightRules) => {
  const mappings = {}
  mappings[FlightRules.IFR] = 'I'
  mappings[FlightRules.Y] = 'Y'
  mappings[FlightRules.Z] = 'Z'
  return mappings[flightRule]
}

const formatEet = (eet: number) => {
  const hours = Math.floor(eet / 60)
  const minutes = eet % 60
  return `${hours}`.padStart(2, '0') + `${minutes}`.padStart(2, '0')
}

const IcaoFpl: React.FC<IcaoFplProps> = ({ flight }) => {
  return (
    <pre
      className="bg-light pt-3 px-2 border rounded"
      style={{ lineHeight: '6px' }}
    >
      <p>
        (FPL-{flight.callsign}-{flightRules(flight.flightRules)}S
      </p>
      <p>
        -1/{flight.aircraft.icaoCode}/{flight.aircraft.wakeTurbulence}-
        {flight.aircraft.equipment}/L1B1
      </p>
      <p>
        -{flight.arrivalIcao}
        {flight.estimatedOffBlockTime}
      </p>
      <p>
        -{flight.cruisingSpeed}F{flight.cruisingLevel} {flight.route}
      </p>
      <p>
        -{flight.arrivalIcao}
        {formatEet(flight.estimatedEnrouteMinutes)}
      </p>
      <p>-{flight.remarks})</p>
    </pre>
  )
}

export default IcaoFpl
