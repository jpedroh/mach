import { Flight } from '@mach/shared/database'
import { FC } from 'react'
import { Button } from '@mach/shared/ui'

type Props = {
  flight: Pick<
    Flight,
    | 'company'
    | 'flightNumber'
    | 'aircraft'
    | 'departureIcao'
    | 'arrivalIcao'
    | 'estimatedOffBlockTime'
    | 'route'
    | 'estimatedEnrouteMinutes'
    | 'cruisingLevel'
    | 'remarks'
  >
}

const VatsimButton: FC<Props> = ({ flight }) => {
  const query: Record<string, string> = {
    airline: flight.company,
    fltnum: flight.flightNumber.toString(),
    type: flight.aircraft.icaoCode,
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

  return (
    <Button asChild>
      <a href={simBriefLink} target="_blank">
        SimBrief
      </a>
    </Button>
  )
}

export default VatsimButton
