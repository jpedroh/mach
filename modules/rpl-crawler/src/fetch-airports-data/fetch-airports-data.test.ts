import { test, expect } from 'vitest'
import { makeFetchAirportsData } from './fetch-airports-data'

const fetchAirportsData = makeFetchAirportsData({
  apiKey: 'DUMB_KEY',
  apiPassword: 'DUMB_PASSWORD',
})

test('It fetches data from the airports', async () => {
  const airportsData = await fetchAirportsData(new Set(['SBRF', 'SBBV']))

  expect(airportsData).toEqual([
    {
      id: 'SBRF',
      name: 'Guararapes - Gilberto Freyre',
      city: 'Recife',
    },
    {
      id: 'SBBV',
      name: 'Atlas Brasil Cantanhede',
      city: 'Boa Vista',
    },
  ])
})
