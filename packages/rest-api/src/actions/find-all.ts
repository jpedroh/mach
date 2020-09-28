import Request from '../express-callback/request'
import { FlightUseCase } from '../use-case'

const makeFindAll = ({ findAll }: FlightUseCase) => {
  return ({ query }: Request) => {
    const limit = parseInt(query.limit as string) || 15
    const offset = parseInt(query.offset as string) || 0

    return findAll({ ...query, limit, offset })
  }
}

export default makeFindAll
