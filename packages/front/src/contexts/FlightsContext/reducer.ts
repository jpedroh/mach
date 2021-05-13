import { FlightsState, FlightsAction } from './types'

const reducer = (state: FlightsState, action: FlightsAction) => {
  switch (action.type) {
    case 'LOAD_FLIGHTS_INIT':
      return { ...state, query: action.payload, loading: true, error: null }
    case 'LOAD_FLIGHTS_SUCCESS':
      return {
        ...state,
        data: {
          items: [...state.data.items, ...action.payload.items],
          count: action.payload.count
        },
        loading: false,
        error: null
      }
    case 'LOAD_FLIGHTS_RESET':
      return {
        ...state,
        data: {
          items: [],
          count: 0
        },
        loading: false,
        error: null
      }
    case 'LOAD_FLIGHTS_ERROR':
      return {
        ...state,
        data: {
          items: [],
          count: 0
        },
        loading: false,
        error: action.payload
      }
    default:
      throw new Error('Invalid action provided')
  }
}

export default reducer
