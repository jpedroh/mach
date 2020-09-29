import React from 'react'
import Flight, { FlightRules } from '@mach/common'
import getIcaoFpl from '../actions/get-icao-fpl'

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
    <pre className="bg-light pt-2 px-2 border rounded">
      <p>{getIcaoFpl(flight)}</p>
    </pre>
  )
}

export default IcaoFpl
