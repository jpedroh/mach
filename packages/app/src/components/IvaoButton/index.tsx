import Flight from '@mach/common'
import { FC, useRef } from 'react'
import Button from '../Button'

type Props = {
  flight: Flight
}

const IvaoButton: FC<Props> = ({ flight }) => {
  const ref = useRef(document.createElement('form'))

  function stringToSeconds(time: string) {
    const hours = Number(time.substring(0, 2))
    const minutes = Number(time.substring(2, 4))

    return hours * 3600 + minutes * 60
  }

  const flightPlan = {
    callsign: flight.callsign,
    flightRules: flight.flightRules,
    flightType: 'S',
    aircraftNumber: 1,
    aircraftId: flight.aircraft.icaoCode,
    aircraftWakeTurbulence: flight.aircraft.wakeTurbulence,
    aircraftEquipments: flight.aircraft.equipment.split(''),
    aircraftTransponderTypes: ['L1', 'B1'],
    departureId: flight.departureIcao,
    departureTime: stringToSeconds(flight.estimatedOffBlockTime),
    cruisingSpeedType: 'N',
    cruisingSpeed: flight.cruisingSpeed,
    altitudeType: 'F',
    altitude: flight.cruisingLevel,
    route: flight.route,
    arrivalId: flight.arrivalIcao,
    eet: flight.estimatedEnrouteMinutes * 60,
    remarks: flight.remarks,
  }

  const url = new URL('https://fpl.ivao.aero/flight-plans/create')
  url.searchParams.set('flightPlan', btoa(JSON.stringify(flightPlan)))

  return (
    <Button
      href={url.toString()}
      target="_blank"
      rel="noreferrer"
      type="submit"
      variant="primary"
      onClick={() => ref.current.submit()}
    >
      IVAO FP
    </Button>
  )
}

export default IvaoButton
