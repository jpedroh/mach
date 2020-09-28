import makeFindById from './find-by-id'
import FlightUseCase from '../use-case'
import makeFindAll from './find-all'

export default {
  findById: makeFindById(FlightUseCase),
  findAll: makeFindAll(FlightUseCase)
}
