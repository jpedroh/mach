import { Flight } from '@mach/shared/database'
import { Button } from '@mach/shared/ui'

type Props = {
  flight: Flight
}

export function VatsimFplButton({ flight }: Props) {
  const vatsimLink = `https://cert.vatsim.net/fp/file.php?2=${
    flight.callsign
  }&3=${flight.aircraft.icaoCode}&4=${flight.cruisingSpeed}&5=${
    flight.departureIcao
  }&6=${flight.estimatedOffBlockTime}&7=${flight.cruisingLevel
    .toString()
    .padStart(3, '0')}&8=${flight.route}&9=${
    flight.arrivalIcao
  }&10a=${Math.floor(flight.estimatedEnrouteMinutes / 60)}&10b=${
    flight.estimatedEnrouteMinutes % 60
  }&11=${flight.remarks}`

  return (
    <Button asChild>
      <a href={vatsimLink} target="_blank">
        Vatsim FP
      </a>
    </Button>
  )
}
