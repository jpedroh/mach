import Flight from '@mach/common'
import React from 'react'
import Button from 'react-bootstrap/Button'

type VatsimButtonProps = {
  flight: Flight
}

const VatsimButton: React.FC<VatsimButtonProps> = ({ flight }) => {
  const vatsimLink = `https://cert.vatsim.net/fp/file.php?2=${
    flight.callsign
  }&3=${flight.aircraft.icaoCode}&4=${flight.cruisingSpeed}&5=${
    flight.departureIcao
  }&6=${flight.estimatedOffBlockTime}&7=${flight.cruisingLevel}&8=${
    flight.route
  }&9=${flight.arrivalIcao}&10a=${Math.floor(
    flight.estimatedEnrouteMinutes / 60
  )}&10b=${flight.estimatedEnrouteMinutes % 60}&11=${flight.remarks}`

  return (
    <Button href={vatsimLink} target="_blank" variant="primary">
      File Vatsim FP
    </Button>
  )
}

export default VatsimButton
