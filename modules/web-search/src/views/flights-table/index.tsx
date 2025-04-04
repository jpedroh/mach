import { Button } from '@mach/web-shared-ui/button'
import { Table } from '@mach/web-shared-ui/table'
import { fetchFlights } from '../../services/fetch-flights'
import { formatAirport } from '../../utils/format-airport'

type Props = {
  flights: Awaited<ReturnType<typeof fetchFlights>>
  onViewDetails: (id: string) => void
}

function minutesToEet(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}`
}

export function FlightsTable({ flights, onViewDetails }: Props) {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.Heading>Callsign</Table.Heading>
          <Table.Heading>Departure</Table.Heading>
          <Table.Heading>Arrival</Table.Heading>
          <Table.Heading>EOBT</Table.Heading>
          <Table.Heading>EET</Table.Heading>
          <Table.Heading>Aircraft</Table.Heading>
          <Table.Heading>Details</Table.Heading>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {flights.map((flight, key) => (
          <Table.Row key={key}>
            <Table.Column>{flight.callsign}</Table.Column>
            <Table.Column>
              <abbr title={formatAirport(flight.departure)}>
                {flight.departure.id}
              </abbr>
            </Table.Column>
            <Table.Column>
              <abbr title={formatAirport(flight.arrival)}>
                {flight.arrival.id}
              </abbr>
            </Table.Column>
            <Table.Column>{flight.estimatedOffBlockTime}</Table.Column>
            <Table.Column>
              {minutesToEet(flight.estimatedEnrouteMinutes)}
            </Table.Column>
            <Table.Column>{flight.aircraftIcaoCode}</Table.Column>
            <Table.Column className="grid">
              <Button
                onPress={() => onViewDetails(flight.id)}
                variant={'primary'}
                className={'normal-case'}
              >
                View Details
              </Button>
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
