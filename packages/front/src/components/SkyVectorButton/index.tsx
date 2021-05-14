import Flight from '@mach/common'
import { FC } from 'react'
import Button from '../Button'

type Props = {
  flight: Flight
}

const SkyVectorButton: FC<Props> = ({ flight }) => {
  const skyVectorLink = `https://skyvector.com/?fpl=${flight.cruisingSpeed}F${flight.cruisingLevel} ${flight.departureIcao} ${flight.route} ${flight.arrivalIcao}`

  return (
    <Button href={skyVectorLink} target="_blank">
      SkyVector
    </Button>
  )
}

export default SkyVectorButton
