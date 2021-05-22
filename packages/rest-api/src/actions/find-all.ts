import { FindFlightsWhere } from '../data-access/find-all'
import BadRequestException from '../exception/bad-request-exception'
import Request from '../express-callback/request'
import { FlightUseCase } from '../use-case'

const makeFindAll = ({ findAll }: FlightUseCase) => {
  return ({ query }: Request) => {
    const limit = parseInt(query.limit as string) || 15
    const offset = parseInt(query.offset as string) || 0

    if (limit < 0) {
      throw new BadRequestException('Limit must be a positive integer')
    }

    if (offset < 0) {
      throw new BadRequestException('Offset must be a positive integer')
    }

    const where: FindFlightsWhere = {
      ...(query.departureIcao && {
        departureIcao: query.departureIcao.split(',')
      }),
      ...(query.arrivalIcao && { arrivalIcao: query.arrivalIcao.split(',') }),
      ...(query.company && { company: query.company.split(',') })
    }

    return findAll({ ...where, limit, offset })
  }
}

export default makeFindAll
