import makeFindById from "./find-by-id";
import FlightRepository from "../data-access";
import Flight from "@mach-flight-planning/common";
import makeFindAll from "./find-all";
import {FindFlightsOutput, FindFlightsQuery} from "../data-access/find-all";

export type FlightUseCase = {
  findById(number): Promise<Flight>
  findAll(query: FindFlightsQuery): Promise<FindFlightsOutput>
}

export default {
  findById: makeFindById(FlightRepository),
  findAll: makeFindAll(FlightRepository)
} as FlightUseCase