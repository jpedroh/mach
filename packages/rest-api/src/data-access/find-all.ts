import Flight from '@mach/common'
import { FlightModel } from '@mach/database'

export type FindFlightsQuery = {
  limit: number
  offset: number
  departureIcao?: string
  arrivalIcao?: string
  company?: string
}

export type FindFlightsOutput = {
  count: number
  items: Flight[]
}

const makeFindAll = ({ model }: { model: typeof FlightModel }) => {
  return async ({
    limit,
    offset,
    ...where
  }: FindFlightsQuery): Promise<FindFlightsOutput> => {
    const { rows: items, count } = await model.findAndCountAll({
      limit,
      offset,
      where
    })

    return { count, items }
  }
}

export default makeFindAll
