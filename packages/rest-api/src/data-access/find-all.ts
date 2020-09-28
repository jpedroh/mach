import Flight from "@mach/common"
import {FlightModel} from "@mach/database"

export type FindFlightsQuery = {
  limit: number;
  offset: number;
  departureIcao?: string;
  arrivalIcao?: string;
  company?: string;
}

export type FindFlightsOutput = {
  count: number;
  items: Flight[];
}

const makeFindAll = ({model}: { model: typeof FlightModel }) => {
  return async (query: FindFlightsQuery): Promise<FindFlightsOutput> => {
    const {limit, offset} = query;
    const {departureIcao, arrivalIcao, company} = query;

    const {rows: items, count} = await model.findAndCountAll({
      limit, offset,
      where: JSON.parse(JSON.stringify({
        departureIcao, arrivalIcao, company
      }))
    });

    return {count, items};
  }
}

export default makeFindAll