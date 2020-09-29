import Flight from '@mach/common'
import React from 'react'
import Button from 'react-bootstrap/Button'

type SkyVectorButtonProps = {
  flight: Flight
}

const SkyVectorButton: React.FC<SkyVectorButtonProps> = ({ flight }) => {
  const skyVectorLink = `https://skyvector.com/?fpl=${flight.cruisingSpeed}F${flight.cruisingLevel} ${flight.departureIcao} ${flight.route} ${flight.arrivalIcao}`

  return (
    <Button href={skyVectorLink} target="_blank" variant="primary">
      View on SkyVector
    </Button>
  )
}

export default SkyVectorButton
