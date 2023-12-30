import { ModalContent, ModalFooter, ModalHeading } from '@mach/web/shared/ui'
import { ReactNode } from 'react'
import { fetchFlightById } from '../services/fetch-flight-by-id'
import { formatEet } from '../utils/format-eet'
import { CloseButton } from './close-button'
import { IcaoFpl } from './icao-fpl'
import { IvaoFplButton } from './ivao-fpl-button'
import { ModalWrapper } from './modal-wrapper'
import { SimBriefButton } from './simbrief-button'
import { SkyVectorButton } from './sky-vector-button'
import { VatsimFplButton } from './vatsim-fpl-button'

type Props = {
  id: string
}

function FlightInfoGroup({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between gap-2 md:gap-4 flex-wrap">
      {children}
    </div>
  )
}

function FlightInfo({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{label}</span>
      <span>{children}</span>
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h4 className="mb-2 font-semibold mt-2">{children}</h4>
}

export async function FlightDetailsModal({ id }: Props) {
  const flight = await fetchFlightById(id)

  if (!flight) {
    throw new Error(`Flight with id ${id} not found`)
  }

  return (
    <ModalWrapper>
      <ModalHeading>
        Flight {flight.callsign} from {flight.departureIcao} to{' '}
        {flight.arrivalIcao}
      </ModalHeading>
      <ModalContent>
        <SectionTitle>GENERAL INFORMATION</SectionTitle>
        <FlightInfoGroup>
          <FlightInfo label="EOBT">{flight.estimatedOffBlockTime}Z</FlightInfo>
          <FlightInfo label="EET">
            {formatEet(flight.estimatedEnrouteMinutes)}
          </FlightInfo>
          <FlightInfo label="AIRCRAFT">{flight.aircraft.icaoCode}</FlightInfo>
          <FlightInfo label="SPEED">{flight.cruisingSpeed}</FlightInfo>
          <FlightInfo label="FL">
            {flight.cruisingLevel.toString().padStart(3, '0')}
          </FlightInfo>
        </FlightInfoGroup>

        <FlightInfo label={'ROUTE'}>{flight.route}</FlightInfo>
        <FlightInfo label={'REMARKS'}>{flight.remarks}</FlightInfo>

        <SectionTitle>ICAO FPL</SectionTitle>
        <IcaoFpl flight={flight} />
      </ModalContent>

      <ModalFooter className={'flex flex-wrap md:flex-nowrap gap-3'}>
        <IvaoFplButton flight={flight} />
        <VatsimFplButton flight={flight} />
        <SimBriefButton flight={flight} />
        <SkyVectorButton flight={flight} />
        <CloseButton flight={flight} />
      </ModalFooter>
    </ModalWrapper>
  )
}
