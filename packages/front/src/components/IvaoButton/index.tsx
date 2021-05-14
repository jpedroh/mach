import Flight from '@mach/common'
import { FC, useRef } from 'react'
import { formatEet } from '../../utils/formatEet'
import { formatFlightRules } from '../../utils/formatFlightRules'
import Button from '../Button'

type Props = {
  flight: Flight
}

const IvaoButton: FC<Props> = ({ flight }) => {
  const ref = useRef(document.createElement('form'))

  return (
    <div>
      <form
        ref={ref}
        id="ivaoform"
        action="https://fpl.ivao.aero/api/fp/load"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="CALLSIGN" value={flight.callsign} />
        <input
          type="hidden"
          name="RULES"
          value={formatFlightRules(flight.flightRules)}
        />
        <input type="hidden" name="FLIGHTTYPE" value="S" />
        <input type="hidden" name="NUMBER" value="1" />
        <input type="hidden" name="ACTYPE" value={flight.aircraft.icaoCode} />
        <input
          type="hidden"
          name="WAKECAT"
          value={flight.aircraft.wakeTurbulence}
        />
        <input
          type="hidden"
          name="EQUIPMENT"
          value={flight.aircraft.equipment}
        />
        <input type="hidden" name="TRANSPONDER" value="LB1" />
        <input type="hidden" name="DEPICAO" value={flight.departureIcao} />
        <input
          type="hidden"
          name="DEPTIME"
          value={flight.estimatedOffBlockTime}
        />
        <input type="hidden" name="SPEEDTYPE" value="N" />
        <input
          type="hidden"
          name="SPEED"
          value={flight.cruisingSpeed.substr(1)}
        />
        <input type="hidden" name="LEVELTYPE" value="F" />
        <input type="hidden" name="LEVEL" value={flight.cruisingLevel} />
        <input type="hidden" name="ROUTE" value={flight.route} />
        <input type="hidden" name="DESTICAO" value={flight.arrivalIcao} />
        <input
          type="hidden"
          name="EET"
          value={formatEet(flight.estimatedEnrouteMinutes)}
        />
        <input type="hidden" name="OTHER" value={flight.remarks} />
      </form>

      <Button
        type="submit"
        variant="primary"
        onClick={() => ref.current.submit()}
      >
        IVAO FP
      </Button>
    </div>
  )
}

export default IvaoButton
