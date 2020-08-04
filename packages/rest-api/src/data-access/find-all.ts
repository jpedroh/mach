import Flight from "@mach-flight-planning/common"
import {FlightModel} from "@mach-flight-planning/database"

export type FindFlightsQuery = {
  limit: number;
  offset: number;
}

export type FindFlightsOutput = {
  count: number;
  items: Flight[];
}

const makeFindAll = ({model}: { model: typeof FlightModel }) => {
  return async (query: FindFlightsQuery): Promise<FindFlightsOutput> => {
    const {rows: items, count} = await model.findAndCountAll(query);

    return {count, items};
  }
}

export default makeFindAll