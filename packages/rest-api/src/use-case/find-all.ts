import { FlightRepository } from '../data-access'
import { FindFlightsQuery } from '../data-access/find-all'

const makeFindAll = ({ findAll }: FlightRepository) => {
  return async (query: FindFlightsQuery) => findAll(query)
}

export default makeFindAll
