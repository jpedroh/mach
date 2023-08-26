import Flight, { FlightRules, WakeTurbulence } from '@mach/common'
import {
  resolveEstimatedEnrouteMinutes,
  resolveFlightDate,
  resolveFlightRules,
  resolveWeekDays,
} from './flight-decoder-utils'

const makeFlightDecoder = ({ uuid }: { uuid: (line: string) => string }) => {
  return (line: string): Flight => {
    const LINES = line.split('\n').map((line) => line.trim())

    const LINE_1 = LINES[0]
    const callsign = LINE_1.match(/[A-Z]{3}\d+/)[0]
    const beginDate = resolveFlightDate(
      LINE_1.match(/(?<= )\d{6}(?= (\d| ))/)[0]
    )
    const endDate = LINE_1.match(/(?<= )(\d{6}|( ){6})(?= [I|V|Y|Z])/)[0]
    const company = callsign.match(/[A-Z]+/)[0]
    const flightNumber = Number(callsign.match(/\d+/)[0])
    const departureIcao = LINE_1.substr(-9, 4)
    const estimatedOffBlockTime = LINE_1.match(/\d{4}$/)[0]
    const flightRules = LINE_1.match(/(?<= ).(?=[A-Z] )/)[0]
    const weekDays = LINE_1.match(/(?<= )(\d| ){7}(?= )/)[0].trim()

    const LINE_2 = LINES[1]
    const cruisingSpeed = LINE_2.match(/(?<=\/)N\d+/)[0]
    const cruisingLevel = Number(LINE_2.match(/(?<=F)\d+/)[0])
    const route = LINE_2.match(/(?<=\/N\d+F\d+ ).*/)[0]

    const LINE_3 = LINES[2]
    const arrivalIcao = LINE_3.substring(0, 4)
    const estimatedEnrouteMinutes = resolveEstimatedEnrouteMinutes(
      (LINE_3.match(/\d{4}/) ?? ['0000'])[0]
    )
    const remarks = LINE_3.substring(13)

    const aircraft = {
      icaoCode: LINE_1.match(/[A-Z0-9]+(?=(\/(M|L|H|J)))/)[0],
      wakeTurbulence: LINE_1.match(/(?<=\/)(M|L|H|J)/)[0] as WakeTurbulence,
      equipment: remarks.match(/(?<=EQPT\/)[^\s]+/)[0],
    }

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
      aircraft,
      estimatedOffBlockTime,
      flightRules: resolveFlightRules(route),
      weekdays: resolveWeekDays(weekDays),
      beginDate,
      endDate: endDate.trim() ? resolveFlightDate(endDate) : null,
    }
  }
}

export default makeFlightDecoder
