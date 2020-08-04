import Flight from "../types/flight"
// import FlightModel from "./database-mapping"
import Connection, {FlightModel} from '@mach/database'

type SaveFlightsDependecies = { connection: typeof Connection, model: typeof FlightModel }

const makeSaveFlights = ({connection, model}: SaveFlightsDependecies) => {
  return async (flights: Flight[]): Promise<void> => {
    await connection.transaction(async (transaction) => {
      await model.destroy({truncate: true, transaction})
      await model.bulkCreate(flights, {transaction})
    })

    await connection.close()
  }
}

export default makeSaveFlights