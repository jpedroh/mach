import { WakeTurbulence } from '../../../shared-database/src'
import { Flight } from '../../../shared-database/src'
import {
  resolveEstimatedEnrouteMinutes,
  resolveFlightDate,
  resolveFlightRules,
  resolveWeekDays,
} from './flight-decoder-utils'

const makeFlightDecoder = ({ uuid }: { uuid: (line: string) => string }) => {
  return (line: string): Omit<Flight, 'cycle'> => {
    line = line.trim()

    const callsign = line.substring(22, 29).trim()
    const beginDate = resolveFlightDate(line.substring(0, 6))
    const endDate =
      line.substring(7, 13).trim() === 'UFN'
        ? null
        : resolveFlightDate(line.substring(7, 13))
    const company = callsign.match(/[A-Z]+/)[0]
    const flightNumber = Number(callsign.match(/\d+/)[0])
    const departureIcao = line.substring(37, 41)
    const estimatedOffBlockTime = line.substring(41, 45)
    const weekDays = line.substring(14, 21)
    const cruisingSpeed = line.substring(46, 51)
    const cruisingLevel = Number(line.substring(52, 55))
    const route = line.substring(56, line.indexOf('  ')).trim()
    const rightPadStart = line.lastIndexOf('  ') + 2
    const arrivalIcao = line.substring(rightPadStart, rightPadStart + 4).trim()
    const estimatedEnrouteMinutes = resolveEstimatedEnrouteMinutes(
      line.substring(rightPadStart + 4, rightPadStart + 8).trim()
    )
    const remarks = line.substring(rightPadStart + 9)

    return {
      id: uuid(line),
      callsign,
      company,
      flightNumber,
      cruisingSpeed,
      cruisingLevel,
      route,
      arrivalIcao,
      estimatedEnrouteMinutes,
      remarks,
      departureIcao,
      aircraftIcaoCode: line.match(/[A-Z0-9]+(?=(\/(M|L|H|J)))/)![0],
      aircraftEquipment: remarks.match(/(?<=EQPT\/)[^\s]+/)![0],
      aircraftWakeTurbulence: line.match(
        /(?<=\/)(M|L|H|J)/
      )![0] as WakeTurbulence,
      estimatedOffBlockTime,
      flightRules: resolveFlightRules(route),
      weekdays: resolveWeekDays(weekDays),
      beginDate,
      endDate,
    }
  }
}

export default makeFlightDecoder
