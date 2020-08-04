import NotFoundException from "../exception/not-found-exception";
import {FlightRepository} from "../data-access";

const makeFindById = ({findById}: FlightRepository) => {
  return async (id: number) => {
    const flight = await findById(id);
    if (!flight) {
      throw new NotFoundException();
    }

    return flight;
  }
}

export default makeFindById;