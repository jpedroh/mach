import type { WakeTurbulence } from '@mach/shared-database/enum'
import type {
  FlightParsingError,
  ParseFlightResult,
  ParseResult,
} from './types'
import {
  parseEstimatedEnrouteMinutes,
  resolveFlightDate,
  resolveFlightRules,
  resolveWeekDays,
} from './utils'
import type { Flight } from '@mach/shared-database/schema'

const makeFlightParser = ({ uuid }: { uuid: (line: string) => string }) => {
  return (line: string): ParseFlightResult => {
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
    const route = line
      .match(/(?<=[A-Z0-9]{4}\d{4} N\d{4} \d{3} ).+(?= {2})/)[0]
      .trim()
    const rightPadStart = line.lastIndexOf('  ') + 2
    const arrivalIcao = line.substring(rightPadStart, rightPadStart + 4).trim()

    const estimatedEnrouteMinutes = parseFlightField({
      field: 'estimatedEnrouteMinutes',
      input: line.substring(rightPadStart + 4, rightPadStart + 8).trim(),
      parser: parseEstimatedEnrouteMinutes,
    })
    if (estimatedEnrouteMinutes.valid === false) {
      return estimatedEnrouteMinutes
    }

    const remarks = line.substring(rightPadStart + 9)

    const parsedFlight = {
      id: uuid(line),
      callsign,
      company,
      flightNumber,
      cruisingSpeed,
      cruisingLevel,
      route,
      arrivalIcao,
      estimatedEnrouteMinutes: estimatedEnrouteMinutes.data,
      remarks,
      departureIcao,
      aircraftIcaoCode: line.match(/[A-Z0-9]+(?=(\/(M|L|H|J)))/)[0],
      aircraftEquipment: remarks.match(/(?<=EQPT\/)[^\s]+/)[0],
      aircraftWakeTurbulence: line.match(
        /(?<=\/)(M|L|H|J)/
      )[0] as WakeTurbulence,
      estimatedOffBlockTime,
      flightRules: resolveFlightRules(route),
      weekdays: resolveWeekDays(weekDays),
      beginDate,
      endDate,
    }

    return { valid: true, data: parsedFlight }
  }
}

function parseFlightField<T>({
  field,
  input,
  parser,
}: {
  field: keyof Omit<Flight, 'cycle'>
  input: string
  parser: (input: string) => ParseResult<T, string>
}): ParseResult<T, FlightParsingError> {
  const result = parser(input)
  if (result.valid === true) {
    return result
  }
  return {
    valid: false,
    error: { field, input, message: result.error },
  }
}

export default makeFlightParser
