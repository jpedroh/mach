import { environment } from '../utils/environment'
import { makeFetchAirportsData } from './fetch-airports-data'

export const fetchAirportsData = makeFetchAirportsData({
  apiKey: environment.AISWEB_API_KEY,
  apiPassword: environment.AISWEB_API_PASSWORD,
})
