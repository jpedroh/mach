import { randomUUID } from 'crypto'
import { describe, expect, test } from 'vitest'
import makeFlightDecoder from './flight-decoder'

describe('flight-decoder', () => {
  const flightDecoder = makeFlightDecoder({ uuid: () => randomUUID() })

  test('Given flight with begin and end date', () => {
    const line = `121123 191123 0000007 AZU2737 AT76/M SBAR1330 N0258 150 DENDO DCT ANBEX                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  SBRF0106 EQPT/SDFGHIRY/LB1 PBN/B2B3B4C2D2D3O2S1`
    const flight = flightDecoder(line)

    expect(flight.beginDate).toEqual('2023-11-12')
    expect(flight.endDate).toEqual('2023-11-19')
  })

  test('Given flight with IFR Flight Rule', () => {
    const line = `121123 191123 0000007 AZU2737 AT76/M SBAR1330 N0258 150 DENDO DCT ANBEX                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  SBRF0106 EQPT/SDFGHIRY/LB1 PBN/B2B3B4C2D2D3O2S1`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('IFR')
  })

  test('Given flight with Y Flight Rule', () => {
    const line = `   131123 131123 1000000 ACN5580 C208/L SBBE0945 N0155 100 DCT TAMAR DCT APURU DCT 0055S05219W/N0150F065 VFR DCT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            SBMD0135 EQPT/SDFGR/S PBN/B2C2D2O2S1 OPR/AZUL CONECTA LTDA PER/A RALT/F090 DCT SBBE RMK/JAH VOADO VMC`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('Y')
  })

  test('Given flight with Z Flight Rule', () => {
    const line = `   131123 171123 1204500 ACN5341 C208/L SBBW1810 N0155 085 DCT MASVO/N0155F100 IFR DCT MAGDA DCT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            SBCY0120 EQPT/SDFGR/S PBN/B2C2D2O2S1 EET/SBAZ0021 OPR/AZUL CONECTA LTDA PER/A RMK/JAH VOADO VMC`
    const flight = flightDecoder(line)

    expect(flight.flightRules).toEqual('Z')
  })

  test('Given a flight', () => {
    const line = `   171123 181123 0000500 TAM3710 A320/M SBBR2350 N0450 340 ILKUS DCT OPNAX UZ24 ANBIX UM402 BVI DCT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         SBBV0320 EQPT/SDE2FGHIM1RWXYZ/C PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBAZ0055 RMK/TCAS`
    const flight = flightDecoder(line)

    expect(flight.callsign).toEqual('TAM3710')
    expect(flight.company).toEqual('TAM')
    expect(flight.flightNumber).toEqual(3710)
    expect(flight.aircraftIcaoCode).toEqual('A320')
    expect(flight.aircraftWakeTurbulence).toEqual('M')
    expect(flight.aircraftEquipment).toEqual('SDE2FGHIM1RWXYZ/C')
    expect(flight.departureIcao).toEqual('SBBR')
    expect(flight.estimatedOffBlockTime).toEqual('2350')
    expect(flight.cruisingSpeed).toEqual('N0450')
    expect(flight.cruisingLevel).toEqual(340)
    expect(flight.weekdays).toEqual(['FRIDAY'])
    expect(flight.route).toEqual('ILKUS DCT OPNAX UZ24 ANBIX UM402 BVI DCT')
    expect(flight.arrivalIcao).toEqual('SBBV')
    expect(flight.estimatedEnrouteMinutes).toEqual(200)
    expect(flight.remarks).toEqual(
      'EQPT/SDE2FGHIM1RWXYZ/C PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBAZ0055 RMK/TCAS'
    )
    expect(flight.flightRules).toEqual('IFR')
  })
})
