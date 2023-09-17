import { randomUUID } from 'crypto'
import { describe, expect, test } from 'vitest'
import makeFlightDecoder from './flight-decoder'

describe('flight-decoder', () => {
  const flightDecoder = makeFlightDecoder({ uuid: (_) => randomUUID() })

  test('Given flight with begin and end date', () => {
    const line = `#C 230720 TAM3587 26      230720 011020 IS A321/M SW/C SBRF 0005
      /N0450F360 DCT KIDAN UZ59 CARVA DCT
      SBBR 0225 C/ EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS
      @`
    const flight = flightDecoder(line)

    expect(flight.beginDate).toEqual(new Date(Date.UTC(2020, 6, 23)))
    expect(flight.endDate).toEqual(new Date(Date.UTC(2020, 9, 1)))
  })

  test('Given flight with IFR Flight Rule', () => {
    const line = `#C 230720 TAM3587 26      230720 011020 IS A321/M SW/C SBRF 0005
      /N0450F360 DCT KIDAN UZ59 CARVA DCT
      SBBR 0225 C/ EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS
      @`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('IFR')
  })

  test('Given flight with Y Flight Rule', () => {
    const line = `#C 030820 GLO1913 12356   030820 120820 IS B738/M SW/C SBFZ 0000
      /N0460F360 UZ19 SVD/N0250F055 VFR DCT
      SBSV 0136 C/ EQPT/SDFGIKRWY PBN/B1C1D1O1S2 RALT/F370 DCT SV051 DCT CONDE UZ17 SBAR
      @`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('Y')
  })

  test('Given flight with Z Flight Rule', () => {
    const line = `#C 090820 GLO1750 7       090820 090820 IS B737/M SW/C SBIL 1845
      /N0250F145 ILSIN/N0333F180 IFR DCT RAIRA DCT SGR
      SBPS 0027 C/ EQPT/SDFGIKRWY PBN/B1C1D1O1S2
      @`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('Z')
  })

  test('Given a flight', () => {
    const line = `#C 230720 TAM3587 26      230720 011020 IS A321/M SW/C SBRF 0005
      /N0450F360 DCT KIDAN UZ59 CARVA DCT
      SBBR 0225 C/ EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS
      @`
    const flight = flightDecoder(line)

    expect(flight.callsign).toEqual('TAM3587')
    expect(flight.company).toEqual('TAM')
    expect(flight.flightNumber).toEqual(3587)
    expect(flight.aircraft.icaoCode).toEqual('A321')
    expect(flight.aircraft.wakeTurbulence).toEqual('M')
    expect(flight.aircraft.equipment).toEqual('SDE2FGHIM1RWXYZ')
    expect(flight.departureIcao).toEqual('SBRF')
    expect(flight.estimatedOffBlockTime).toEqual('0005')
    expect(flight.cruisingSpeed).toEqual('N0450')
    expect(flight.cruisingLevel).toEqual(360)
    expect(flight.weekdays).toEqual(['TUESDAY', 'SATURDAY'])
    expect(flight.route).toEqual('DCT KIDAN UZ59 CARVA DCT')
    expect(flight.arrivalIcao).toEqual('SBBR')
    expect(flight.estimatedEnrouteMinutes).toEqual(145)
    expect(flight.remarks).toEqual(
      'EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS'
    )
    expect(flight.flightRules).toEqual('IFR')
  })
})
