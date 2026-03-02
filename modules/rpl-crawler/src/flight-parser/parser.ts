import { isWakeTurbulence } from '@mach/shared-database/enum'
import type { Flight } from '@mach/shared-database/schema'
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

const makeFlightParser = ({ uuid }: { uuid: (line: string) => string }) => {
  return (line: string): ParseFlightResult => {
    line = line.trim()

    const callsign = line.substring(22, 29).trim()
    const beginDate = resolveFlightDate(line.substring(0, 6))
    const endDate =
      line.substring(7, 13).trim() === 'UFN'
        ? null
        : resolveFlightDate(line.substring(7, 13))

    const company = parseFlightField({
      field: 'company',
      input: callsign.match(/[A-Z]+/),
      parser: buildRegexParser,
    })
    if (company.valid === false) {
      return company
    }

    const flightNumber = parseFlightField({
      field: 'flightNumber',
      input: callsign.match(/\d+/),
      parser: (input) => {
        if (input === null || !input[0] || isNaN(Number(input[0]))) {
          return {
            valid: false,
            error: 'Could not fetch flightNumber from line',
          }
        }
        return { valid: true, data: Number(input[0]) }
      },
    })
    if (flightNumber.valid === false) {
      return flightNumber
    }

    const departureIcao = line.substring(37, 41)
    const estimatedOffBlockTime = line.substring(41, 45)
    const weekDays = line.substring(14, 21)
    const cruisingSpeed = line.substring(46, 51)
    const cruisingLevel = Number(line.substring(52, 55))

    const route = parseFlightField({
      field: 'route',
      input: line.match(/(?<=[A-Z0-9]{4}\d{4} N\d{4} \d{3} ).+(?= {2})/),
      parser: buildRegexParser,
    })
    if (route.valid === false) {
      return route
    }

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

    const aircraftWakeTurbulence = parseFlightField({
      field: 'aircraftWakeTurbulence',
      input: line.match(/(?<=\/)(M|L|H|J)/),
      parser: (x) => {
        const wakeTurbulence = x !== null ? x[0] : ''
        if (isWakeTurbulence(wakeTurbulence)) {
          return { valid: true, data: wakeTurbulence }
        }
        return {
          valid: false,
          error: `Invalid value provided for Aircraft Wake Turbulence`,
        }
      },
    })
    if (aircraftWakeTurbulence.valid === false) {
      return aircraftWakeTurbulence
    }

    const aircraftIcaoCode = parseFlightField({
      field: 'aircraftIcaoCode',
      input: line.match(/[A-Z0-9]+(?=(\/(M|L|H|J)))/),
      parser: buildRegexParser,
    })
    if (aircraftIcaoCode.valid === false) {
      return aircraftIcaoCode
    }

    const aircraftEquipment = parseFlightField({
      field: 'aircraftEquipment',
      input: remarks.match(/(?<=EQPT\/)[^\s]+/),
      parser: buildRegexParser,
    })
    if (aircraftEquipment.valid === false) {
      return aircraftEquipment
    }

    const parsedFlight = {
      id: uuid(line),
      callsign,
      company: company.data,
      flightNumber: flightNumber.data,
      cruisingSpeed,
      cruisingLevel,
      route: route.data,
      arrivalIcao,
      estimatedEnrouteMinutes: estimatedEnrouteMinutes.data,
      remarks,
      departureIcao,
      aircraftIcaoCode: aircraftIcaoCode.data,
      aircraftEquipment: aircraftEquipment.data,
      aircraftWakeTurbulence: aircraftWakeTurbulence.data,
      estimatedOffBlockTime,
      flightRules: resolveFlightRules(route.data),
      weekdays: resolveWeekDays(weekDays),
      beginDate,
      endDate,
    }

    return { valid: true, data: parsedFlight }
  }
}

function parseFlightField<T, R = string>({
  field,
  input,
  parser,
}: {
  field: keyof Omit<Flight, 'cycle'>
  input: R
  parser: (input: R) => ParseResult<T, string>
}): ParseResult<T, FlightParsingError<R>> {
  const result = parser(input)
  if (result.valid === true) {
    return result
  }
  return {
    valid: false,
    error: { field, input, message: result.error },
  }
}

function buildRegexParser(input: RegExpMatchArray | null): ParseResult<string> {
  if (input !== null && input[0] !== null) {
    return { valid: true, data: input[0].trim() }
  }
  return { valid: false, error: 'Could not parse regex parameter' }
}

export default makeFlightParser
