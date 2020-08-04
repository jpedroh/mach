import Flight from "../types/flight"
import {FlightModel} from "./database-mapping"
import {ModelCtor} from "sequelize";

export type FindFlightsQuery = {
  limit: number;
  offset: number;
}

export type FindFlightsOutput = {
  count: number;
  items: Flight[];
}

const makeFindAll = ({model}: { model: ModelCtor<FlightModel> }) => {
  return async (query: FindFlightsQuery): Promise<FindFlightsOutput> => {
    const {rows: items, count} = await model.findAndCountAll(query);

    return {count, items};
  }
}

export default makeFindAll