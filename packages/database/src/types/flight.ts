import * as FlightEnum from './enum'

type Flight = {
  callsign: string
  beginDate: Date
  endDate?: Date
  company: string
  flightNumber: number
  aircraft: {
    icaoCode: string
    equipment: string
    wakeTurbulence: FlightEnum.WakeTurbulence
  }
  departureIcao: string
  estimatedOffBlockTime: string
  cruisingSpeed: string
  weekdays: FlightEnum.Weekdays[]
  cruisingLevel: number
  route: string
  arrivalIcao: string
  estimatedEnrouteMinutes: number
  remarks: string
  flightRules: FlightEnum.FlightRules
}

export default Flight
