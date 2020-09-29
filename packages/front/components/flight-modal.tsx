import Flight from '@mach/common'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import formatEet from '../utils/format-eet'
import IcaoFpl from './icao-fpl'
import IvaoButton from './ivao-button'
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
        <h5 className="mb-3">GENERAL INFORMATION</h5>
        <div className="row">
          <div className="col-6">
            <p>
              <b>EOBT </b> {flight.estimatedOffBlockTime}Z
            </p>
          </div>
          <div className="col-6">
            <p>
              <b>FLIGHT TIME </b> {formatEet(flight.estimatedEnrouteMinutes)}
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>AIRCRAFT </b> {flight.aircraft.icaoCode}
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>CRUISING SPEED </b> {flight.cruisingSpeed}
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>FL </b> {flight.cruisingLevel}
            </p>
          </div>
          <div className="col-12">
            <p>
              <b>ROUTE </b> {flight.route}
            </p>
          </div>
          <div className="col-12">
            <p>
              <b>REMARKS </b> {flight.remarks}
            </p>
          </div>
        </div>
        <h5 className="my-3">ICAO FPL</h5>
        <IcaoFpl flight={flight} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <SkyVectorButton flight={flight} />
        <VatsimButton flight={flight} />
        <IvaoButton flight={flight} />
      </Modal.Footer>
    </Modal>
  )
}

export default FlightModal
