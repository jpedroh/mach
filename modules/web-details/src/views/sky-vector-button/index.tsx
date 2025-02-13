import type { Flight } from '@mach/shared-database/schema'
import { Button } from '@mach/web-shared-ui/button'

type Props = {
  flight: Flight
}

export function SkyVectorButton({ flight }: Props) {
  const skyVectorLink = `https://skyvector.com/?fpl=${
    flight.cruisingSpeed
  }F${flight.cruisingLevel.toString().padStart(3, '0')} ${
    flight.departureIcao
  } ${flight.route} ${flight.arrivalIcao}`

  return (
    <Button asChild>
      <a href={skyVectorLink} target="_blank" rel="noreferrer">
        SkyVector
      </a>
    </Button>
  )
}
