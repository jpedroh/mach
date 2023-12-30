'use client'

import { Flight } from '@mach/shared/database'
import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { Button } from '@mach/web/shared/ui'

type Props = {
  flight: Flight
}

export function IvaoFplButton({ flight }: Props) {
  const analyticsClient = useAnalyticsClient()

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

  function handlePress() {
    analyticsClient.captureEvent('ivao_fpl_button_click', {
      flightId: flight.id,
    })
  }

  return (
    <Button onPress={handlePress} asChild variant="primary">
      <a href={url.toString()} target="_blank">
        IVAO FP
      </a>
    </Button>
  )
}
