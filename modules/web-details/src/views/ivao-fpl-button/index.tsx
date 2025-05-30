import type { Flight } from '@mach/shared-database/schema'
import { Button } from '@mach/web-shared-ui/button'

type Props = {
  flight: Flight
}

export function IvaoFplButton({ flight }: Props) {
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
    aircraftId: flight.aircraftIcaoCode,
    aircraftWakeTurbulence: flight.aircraftWakeTurbulence,
    aircraftEquipments: flight.aircraftEquipment?.split(''),
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
    <Button asChild variant="primary">
      <a href={url.toString()} target="_blank" rel="noreferrer">
        IVAO FP
      </a>
    </Button>
  )
}
