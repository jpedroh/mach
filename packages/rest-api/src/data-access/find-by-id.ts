import Flight from "@mach-flight-planning/common"
import {FlightModel} from "@mach-flight-planning/database"

const makeFindById = ({model}: { model: typeof FlightModel }) => {
  return async (id: number): Promise<Flight | null> => {
    return model.findOne({where: {id}});
  }
}

export default makeFindById