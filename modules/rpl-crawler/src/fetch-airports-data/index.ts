import { environment } from '../utils/environment.ts'
import { makeFetchAirportsData } from './fetch-airports-data.ts'

export const fetchAirportsData = makeFetchAirportsData({
  apiKey: environment.AISWEB_API_KEY,
  apiPassword: environment.AISWEB_API_PASSWORD,
})
