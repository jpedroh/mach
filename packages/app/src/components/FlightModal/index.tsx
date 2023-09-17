import { Flight } from '@mach/database'
import { FC } from 'react'
import { formatEet } from '../../utils/formatEet'
import Button from '../Button'
import IcaoFpl from '../IcaoFpl'
import IvaoButton from '../IvaoButton'
import SimBriefButton from '../SimBriefButton'
import SkyVectorButton from '../SkyVectorButton'
import VatsimButton from '../VatsimButton'
import styles from './index.module.css'

type Props = {
  show: boolean
  onClose: () => void
  flight: Flight
}

const FlightModal: FC<Props> = ({ show, onClose, flight }) => {
  return show ? (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3>
              Flight {flight.callsign} from {flight.departureIcao} to{' '}
              {flight.arrivalIcao}
            </h3>
          </div>
          <div className={styles.content}>
            <h4>GENERAL INFORMATION</h4>
            <div className="grid grid-cols-2">
              <p>
                <span>EOBT </span> {flight.estimatedOffBlockTime}Z
              </p>
              <p>
                <span>FLIGHT TIME </span>{' '}
                {formatEet(flight.estimatedEnrouteMinutes)}
              </p>
            </div>

            <div className="grid grid-cols-3">
              <p>
                <span>AIRCRAFT </span> {flight.aircraft.icaoCode}
              </p>
              <p>
                <span>CRUISING SPEED </span> {flight.cruisingSpeed}
              </p>
              <p>
                <span>FL </span>{' '}
                {flight.cruisingLevel.toString().padStart(3, '0')}
              </p>
            </div>

            <div className="grid">
              <p>
                <span>ROUTE </span> {flight.route}
              </p>
            </div>
            <div className="grid">
              <p>
                <span>REMARKS </span> {flight.remarks}
              </p>
            </div>

            <h4>ICAO FPL</h4>
            <IcaoFpl flight={flight} />
          </div>
          <div className={styles.footer}>
            <IvaoButton flight={flight} />
            <VatsimButton flight={flight} />
            <SimBriefButton flight={flight} />
            <SkyVectorButton flight={flight} />
            <Button variant="danger" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </>
  ) : (
    <></>
  )
}

export default FlightModal
