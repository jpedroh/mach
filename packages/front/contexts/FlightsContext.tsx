import Flight from '@mach/common'
import { createContext, FC, useCallback, useReducer } from 'react'
import getFlights, { GetFlightsQuery } from '../actions/get-flights'

type FlightsState = {
  data: { items: Flight[]; count: number; query?: GetFlightsQuery }
  loading: boolean
  error: Error | null
}

type FlightsContextData = {
  state: FlightsState
  loadFlights: (params: GetFlightsQuery) => Promise<void>
}

const FlightsContext = createContext({} as FlightsContextData)

const initialState = {
  data: { items: [], count: 0, query: null },
  loading: false,
  error: null
}

const reducer = (
  state: FlightsState,
  action: {
    type: FlightsActions
    payload?: any
  }
): typeof state => {
  switch (action.type) {
    case 'LOAD_FLIGHTS_INIT':
      return {
        ...state,
        data: { ...state.data, query: action.payload },
        loading: true,
        error: null
      }
    case 'LOAD_FLIGHTS_SUCCESS':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        loading: false,
        error: null
      }
    case 'LOAD_FLIGHTS_ERROR':
      return {
        ...state,
        data: { items: [], count: 0 },
        loading: false,
        error: action.payload
      }
    default:
      throw new Error('Invalid operation provided')
  }
}

type FlightsActions =
  | 'LOAD_FLIGHTS_INIT'
  | 'LOAD_FLIGHTS_SUCCESS'
  | 'LOAD_FLIGHTS_ERROR'

const FlightsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadFlights = useCallback(async (params: GetFlightsQuery) => {
    try {
      dispatch({ type: 'LOAD_FLIGHTS_INIT', payload: params })
      const payload = await getFlights(params)
      dispatch({ type: 'LOAD_FLIGHTS_SUCCESS', payload })
    } catch (error) {
      dispatch({ type: 'LOAD_FLIGHTS_ERROR', payload: error })
    }
  }, [])

  return (
    <FlightsContext.Provider value={{ state, loadFlights }}>
      {children}
    </FlightsContext.Provider>
  )
}

export { FlightsContext, FlightsProvider }
