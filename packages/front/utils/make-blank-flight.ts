import Flight, { FlightRules, WakeTurbulence } from '@mach/common'

const makeBlankFlight = (): Flight => ({
  callsign: '',
  beginDate: new Date(),
  company: '',
  flightNumber: 0,
  aircraft: {
    icaoCode: '',
    equipment: '',
    wakeTurbulence: WakeTurbulence.LIGHT
  },
  departureIcao: '',
  estimatedOffBlockTime: '0000',
  cruisingSpeed: '',
  weekdays: [],
  cruisingLevel: 0,
  route: '',
  arrivalIcao: '',
  estimatedEnrouteMinutes: 0,
  remarks: '',
  flightRules: FlightRules.IFR
})

export default makeBlankFlight
