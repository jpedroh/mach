import Flight from "../types/flight"
import {FlightModel} from "./database-mapping"
import {ModelCtor} from "sequelize";

const makeFindById = ({model}: { model: ModelCtor<FlightModel> }) => {
  return async (id: number): Promise<Flight | null> => {
    return model.findOne({ where: { id }});
  }
}

export default makeFindById