import { db, airports, flights } from '@mach/shared/database'

async function globalSetup() {
  console.log('running global setup')
  await db.insert(flights).values([
    {
      id: '967e0cdb-72e3-439c-8bfd-b310a0bd25c1',
      callsign: 'GLO1000',
      beginDate: '2023-12-27',
      endDate: '2023-12-27',
      company: 'GLO',
      flightNumber: 1000,
      departureIcao: 'SBSP',
      estimatedOffBlockTime: '0905',
      cruisingSpeed: 'N0367',
      weekdays: ['WEDNESDAY'],
      cruisingLevel: 270,
      route: 'NIBRU UZ171 KEVUN',
      arrivalIcao: 'SBRJ',
      estimatedEnrouteMinutes: 43,
      flightRules: 'IFR',
      remarks: 'EQPT/SDFGIKRWY/LB1 STS/ATFMX PBN/B1C1D1O1S2T1 EET/SBCW0004',
      cycle: '2023-12-21',
      aircraftIcaoCode: 'B737',
      aircraftEquipment: 'SDFGIKRWY/LB1',
      aircraftWakeTurbulence: 'M',
    },
  ])

  await db.insert(airports).values([
    {
      id: 'SBSP',
      name: 'Congonhas',
      city: 'Sao Paulo',
    },
    {
      id: 'SBRJ',
      name: 'Santos Dumont',
      city: 'Rio de Janeiro',
    },
  ])
}

export default globalSetup
