import { fetchFlightById } from '../services/fetch-flight-by-id'
import { formatEet } from '../utils/format-eet'
import { CloseButton } from './close-button'
import { IcaoFpl } from './icao-fpl'
import styles from './index.module.css'
import { IvaoFplButton } from './ivao-fpl-button'
import { SimBriefButton } from './simbrief-button'
import { SkyVectorButton } from './sky-vector-button'
import { VatsimFplButton } from './vatsim-fpl-button'

type Props = {
  id: string
}

export async function FlightDetailsModal({ id }: Props) {
  const flight = await fetchFlightById(id)

  return (
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
            <IvaoFplButton flight={flight} />
            <VatsimFplButton flight={flight} />
            <SimBriefButton flight={flight} />
            <SkyVectorButton flight={flight} />
            <CloseButton />
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </>
  )
}
