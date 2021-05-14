import Flight from '@mach/common'
import { FC } from 'react'
import Button from '../Button'

type Props = {
  flight: Flight
}

const VatsimButton: FC<Props> = ({ flight }) => {
  const query = {
    airline: flight.company,
    fltnum: flight.flightNumber,
    type: flight.aircraft.icaoCode,
    orig: flight.departureIcao,
    dest: flight.arrivalIcao,
    deph: flight.estimatedOffBlockTime.substr(0, 2),
    depm: flight.estimatedOffBlockTime.substr(2, 2),
    route: flight.route,
    steh: Math.floor(flight.estimatedEnrouteMinutes / 60),
    stem: flight.estimatedEnrouteMinutes % 60,
    fl: flight.cruisingLevel * 100,
    manualrmk: flight.remarks
  }

  const simBriefLink = `http://www.simbrief.com/system/dispatch.php?${new URLSearchParams(
    query as any
  ).toString()}`

  return (
    <Button href={simBriefLink} target="_blank">
      View on SimBrief
    </Button>
  )
}

export default VatsimButton
