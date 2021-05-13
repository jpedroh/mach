export type LoadFlightsQuery = {
  departureIcao?: string
  arrivalIcao?: string
  limit: number
  offset: number
}

export type FlightsState = {
  data: { items: any[]; count: number }
  query: {
    departureIcao?: string
    arrivalIcao?: string
    limit: number
    offset: number
  }
  loading: boolean
  error: Error | null
}

export type FlightsContextData = {
  state: FlightsState
  loadFlights: (params: LoadFlightsQuery) => void
  reset: () => void
}

export type FlightsAction = {
  type:
    | 'LOAD_FLIGHTS_INIT'
    | 'LOAD_FLIGHTS_SUCCESS'
    | 'LOAD_FLIGHTS_RESET'
    | 'LOAD_FLIGHTS_ERROR'
  payload?: any
}
