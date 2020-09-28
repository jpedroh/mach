import Request from '../express-callback/request'
import { FlightUseCase } from '../use-case'

const makeFindById = ({ findById }: FlightUseCase) => {
  return ({ params }: Request) => {
    const id = parseInt(params.id as string)
    return findById(id)
  }
}

export default makeFindById
