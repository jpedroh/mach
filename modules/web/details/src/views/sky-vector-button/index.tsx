'use client'

import { Flight } from '@mach/shared/database'
import { useAnalyticsClient } from '@mach/web/shared/analytics'
import { Button } from '@mach/web/shared/ui'

type Props = {
  flight: Flight
}

export function SkyVectorButton({ flight }: Props) {
  const analyticsClient = useAnalyticsClient()

  const skyVectorLink = `https://skyvector.com/?fpl=${
    flight.cruisingSpeed
  }F${flight.cruisingLevel.toString().padStart(3, '0')} ${
    flight.departureIcao
  } ${flight.route} ${flight.arrivalIcao}`

  function handlePress() {
    analyticsClient.captureEvent('sky_vector_button_click', {
      flightId: flight.id,
    })
  }

  return (
    <Button onPress={handlePress} asChild>
      <a href={skyVectorLink} target="_blank">
        SkyVector
      </a>
    </Button>
  )
}
