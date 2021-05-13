import Flight from '@mach/common'
import { createContext, FC, useReducer } from 'react'
import http from '../../utils/http'
import reducer from './reducer'
import { FlightsContextData, LoadFlightsQuery } from './types'

const FlightsContext = createContext({} as FlightsContextData)

const FlightsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: { items: [], count: 0 },
    query: { limit: 30, offset: 0 },
    loading: false,
    error: null
  })

  const loadFlights = async (query: LoadFlightsQuery) => {
    try {
      if (!query.departureIcao && !query.arrivalIcao) {
        throw new Error('You must fill at least one field.')
      }
      dispatch({ type: 'LOAD_FLIGHTS_INIT', payload: query })
      const payload = await http<{ items: Flight[]; count: number }>({
        url: 'http://mach-api.herokuapp.com/flights',
        query
      })
      if (payload.count === 0) {
        throw new Error('No flights found.')
      }
      dispatch({ type: 'LOAD_FLIGHTS_SUCCESS', payload })
    } catch (error) {
      dispatch({ type: 'LOAD_FLIGHTS_ERROR', payload: error })
    }
  }

  const reset = () => dispatch({ type: 'LOAD_FLIGHTS_RESET' })

  return (
    <FlightsContext.Provider value={{ state, loadFlights, reset }}>
      {children}
    </FlightsContext.Provider>
  )
}

export { FlightsContext, FlightsProvider }
