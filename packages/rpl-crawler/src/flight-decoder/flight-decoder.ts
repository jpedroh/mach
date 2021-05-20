import { WakeTurbulence } from '@mach/common'
import Flight from '@mach/common'
import {
  resolveEstimatedEnrouteMinutes,
  resolveFlightDate,
  resolveFlightRules,
  resolveWeekDays
} from './flight-decoder-utils'

const makeFlightDecoder = ({ uuid }: { uuid: (line: string) => string }) => {
  return (line: string): Flight => {
    const callsign = line.substr(22, 7).trim()
    const company = callsign.substr(0, 3)
    const flightNumber = parseInt(callsign.substr(3))

    const beginDate = resolveFlightDate(line.substr(0, 6).trim())
    const endDatePlainText = line.substr(7, 6).trim()
    const endDate =
      endDatePlainText !== 'UFN' ? resolveFlightDate(endDatePlainText) : null

    const route = line.substr(56, line.indexOf('EQPT') - 66).trim()
    const flightRules = resolveFlightRules(route)

    return {
      id: uuid(line),
      callsign: line.substr(22, 7).trim(),
      company,
      flightNumber,
      beginDate,
      endDate,
      aircraft: {
        icaoCode: line.substr(30, 4).trim(),
        wakeTurbulence: line.charAt(35) as WakeTurbulence,
        equipment: line.match(/EQPT\/([^\s]+)/)[1]
      },
      departureIcao: line.substr(37, 4).trim(),
      estimatedOffBlockTime: line.substr(41, 4).trim(),
      cruisingSpeed: line.substr(46, 5).trim(),
      cruisingLevel: parseInt(line.substr(52, 3).trim()),
      weekdays: resolveWeekDays(line.substr(14, 8).trim()),
      route,
      flightRules,
      arrivalIcao: line.substr(line.indexOf('EQPT') - 9, 4).trim(),
      estimatedEnrouteMinutes: resolveEstimatedEnrouteMinutes(
        line.substr(line.indexOf('EQPT') - 5, 4).trim()
      ),
      remarks: line.match(/EQPT(.*)/)[0]
    }
  }
}

export default makeFlightDecoder
