import Flight from '@mach/common'

export type GetFlightsQuery = {
  departureIcao: string
  arrivalIcao: string
  offset: number
  limit: number
}

export type GetFlightsResponse = {
  count: number
  items: Flight[]
}

const API_URL = `https://mach-api.herokuapp.com/flights`

const getFlights = (query: GetFlightsQuery): Promise<GetFlightsResponse> => {
  const queryString = new URLSearchParams(query).toString()
  return fetch(`${API_URL}?${queryString}`).then(response => response.json())
}

export default getFlights
