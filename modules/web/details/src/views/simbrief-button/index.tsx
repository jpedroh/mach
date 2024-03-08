'use client'

import { Flight } from '@mach/shared/database'
import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { Button } from '@mach/web/shared/ui'

type Props = {
  flight: Pick<
    Flight,
    | 'id'
    | 'company'
    | 'flightNumber'
    | 'aircraftIcaoCode'
    | 'departureIcao'
    | 'arrivalIcao'
    | 'estimatedOffBlockTime'
    | 'route'
    | 'estimatedEnrouteMinutes'
    | 'cruisingLevel'
    | 'remarks'
  >
}

export function SimBriefButton({ flight }: Props) {
  const analyticsClient = useAnalyticsClient()

  const query: Record<string, string> = {
    airline: flight.company,
    fltnum: flight.flightNumber.toString(),
    type: flight.aircraftIcaoCode,
    orig: flight.departureIcao,
    dest: flight.arrivalIcao,
    deph: flight.estimatedOffBlockTime.substr(0, 2),
    depm: flight.estimatedOffBlockTime.substr(2, 2),
    route: flight.route,
    steh: Math.floor(flight.estimatedEnrouteMinutes / 60).toString(),
    stem: (flight.estimatedEnrouteMinutes % 60).toString(),
    fl: (flight.cruisingLevel * 100).toString(),
    manualrmk: flight.remarks,
  }

  const simBriefLink = `http://www.simbrief.com/system/dispatch.php?${new URLSearchParams(
    query
  ).toString()}`

  function handleClick() {
    analyticsClient.captureEvent('simbrief_button_click', {
      flightId: flight.id,
    })
  }

  return (
    <Button asChild>
      <a onClick={handleClick} href={simBriefLink} target="_blank">
        SimBrief
      </a>
    </Button>
  )
}
