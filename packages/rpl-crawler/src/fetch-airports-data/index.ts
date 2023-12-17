import { getEnvironmentVariable } from '@mach/shared/env'
import { makeFetchAirportsData } from './fetch-airports-data'

export const fetchAirportsData = makeFetchAirportsData({
  apiKey: getEnvironmentVariable('AISWEB_API_KEY'),
  apiPassword: getEnvironmentVariable('AISWEB_API_PASSWORD'),
})
