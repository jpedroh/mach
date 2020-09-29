import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Flight from '@mach/common'
import IcaoFpl from './icao-fpl'
import SkyVectorButton from './sky-vector-button'
import VatsimButton from './vatsim-button'

type FlightModalProps = {
  show: boolean
  handleClose: () => void
  flight: Flight
}

const FlightModal: React.FC<FlightModalProps> = ({
  show,
  handleClose,
  flight
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Flight {flight.callsign} from {flight.departureIcao} to{' '}
          {flight.arrivalIcao}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6>ICAO FPL</h6>
        <IcaoFpl flight={flight} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <SkyVectorButton flight={flight} />
        <VatsimButton flight={flight} />
      </Modal.Footer>
    </Modal>
  )
}

export default FlightModal
