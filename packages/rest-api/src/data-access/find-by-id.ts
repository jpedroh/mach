import Flight from "../types/flight"
import {FlightModel} from "@mach/database"

const makeFindById = ({model}: { model: typeof FlightModel }) => {
  return async (id: number): Promise<Flight | null> => {
    return model.findOne({where: {id}});
  }
}

export default makeFindById