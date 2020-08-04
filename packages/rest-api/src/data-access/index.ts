import makeFindAll, {FindFlightsOutput, FindFlightsQuery} from "./find-all";
import {FlightModel as model} from "@mach-flight-planning/database";
import makeFindById from "./find-by-id";
import Flight from "@mach-flight-planning/common"

export type FlightRepository = {
  findAll(query: FindFlightsQuery): Promise<FindFlightsOutput>
  findById(number): Promise<Flight>
}

export default {
  findAll: makeFindAll({model}),
  findById: makeFindById({model})
} as FlightRepository