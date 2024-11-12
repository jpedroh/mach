'use client'

import { Flight } from '@mach/shared-database'
import { Button } from '@mach/web-shared-ui/button'

type Props = {
  flight: Pick<
    Flight,
    | 'id'
    | 'company'
    | 'flightNumber'
    | 'aircraftIcaoCode'
    | 'departureIcao'
    | 'arrivalIcao'
    | 'route'
    | 'estimatedEnrouteMinutes'
    | 'cruisingLevel'
    | 'remarks'
  >
}

export function SimBriefButton({ flight }: Props) {
  const query: Record<string, string> = {
    airline: flight.company,
    fltnum: flight.flightNumber.toString(),
    type: flight.aircraftIcaoCode,
    orig: flight.departureIcao,
    dest: flight.arrivalIcao,
    route: flight.route,
    steh: Math.floor(flight.estimatedEnrouteMinutes / 60).toString(),
    stem: (flight.estimatedEnrouteMinutes % 60).toString(),
    fl: (flight.cruisingLevel * 100).toString(),
    manualrmk: flight.remarks,
  }

  const simBriefLink = `http://www.simbrief.com/system/dispatch.php?${new URLSearchParams(
    query
  ).toString()}`

  return (
    <Button asChild>
      <a href={simBriefLink} target="_blank" rel="noreferrer">
        SimBrief
      </a>
    </Button>
  )
}
