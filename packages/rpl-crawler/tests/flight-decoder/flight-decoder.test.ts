import makeFlightDecoder from '../../src/flight-decoder/flight-decoder';
import { FlightRules, WakeTurbulence, Weekdays } from '../../src/types/enum';

describe('flight-decoder', () => {
    const flightDecoder = makeFlightDecoder()

    test('Given flight with begin and end date', () => {
        const line = "230720 011020 0200060 TAM3587 A321/M SBRF0005 N0450 360 DCT KIDAN UZ59 CARVA DCT SBBR0225 EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS"
        const flight = flightDecoder(line);

        expect(flight.beginDate).toEqual(new Date('2020-07-23'))
        expect(flight.endDate).toEqual(new Date('2020-10-01'))
    })

    test('Given flight with begin date only', () => {
        const line = "230720 UFN    0200060 TAM3587 A321/M SBRF0005 N0450 360 DCT KIDAN UZ59 CARVA DCT SBBR0225 EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS"
        const flight = flightDecoder(line);

        expect(flight.beginDate).toEqual(new Date('2020-07-23'))
        expect(flight.endDate).toBeNull()
    })

    test('Given flight with IFR Flight Rule', () => {
        const line = "230720 UFN    0200060 TAM3587 A321/M SBRF0005 N0450 360 DCT KIDAN UZ59 CARVA DCT SBBR0225 EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS"
        const flight = flightDecoder(line);

        expect(flight.flightRules).toEqual(FlightRules.IFR)
    })

    test('Given flight with Y Flight Rule', () => {
        const line = "030820 120820 1230560 GLO1913 B738/M SBFZ0000 N0460 360 UZ19 SVD/N0250F055 VFR DCT          SBSV0136 EQPT/SDFGIKRWY PBN/B1C1D1O1S2 RALT/F370 DCT SV051 DCT CONDE UZ17 SBAR"
        const flight = flightDecoder(line);

        expect(flight.flightRules).toEqual(FlightRules.Y)
    })

    test('Given flight with Z Flight Rule', () => {
        const line = "090820 090820 0000007 GLO1750 B737/M SBIL1845 N0250 145 ILSIN/N0333F180 IFR DCT RAIRA DCT   SBPS0027 EQPT/SDFGIKRWY PBN/B1C1D1O1S2"
        const flight = flightDecoder(line);

        expect(flight.flightRules).toEqual(FlightRules.Z)
    })

    test('Given a flight', () => {
        const line = "230720 011020 0200060 TAM3587 A321/M SBRF0005 N0450 360 DCT KIDAN UZ59 CARVA DCT SBBR0225 EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS"
        const flight = flightDecoder(line);

        expect(flight.callsign).toEqual('TAM3587')
        expect(flight.company).toEqual('TAM')
        expect(flight.flightNumber).toEqual(3587)
        expect(flight.aircraft.icaoCode).toEqual('A321')
        expect(flight.aircraft.wakeTurbulence).toEqual(WakeTurbulence.MEDIUM)
        expect(flight.aircraft.equipment).toEqual("SDE2FGHIM1RWXYZ")
        expect(flight.departureIcao).toEqual('SBRF')
        expect(flight.estimatedOffBlockTime).toEqual('0005')
        expect(flight.cruisingSpeed).toEqual('N0450')
        expect(flight.cruisingLevel).toEqual(360)
        expect(flight.weekdays).toEqual([Weekdays.TUESDAY, Weekdays.SATURDAY])
        expect(flight.route).toEqual('DCT KIDAN UZ59 CARVA DCT')
        expect(flight.arrivalIcao).toEqual('SBBR')
        expect(flight.estimatedEnrouteMinutes).toEqual(145)
        expect(flight.remarks).toEqual('EQPT/SDE2FGHIM1RWXYZ PBN/A1B1C1D1L1O2S2 DAT/SV EET/SBBS0142 RMK/TCAS')
        expect(flight.flightRules).toEqual(FlightRules.IFR)
    })
})