import { Sequelize } from 'sequelize'
import Flight from "../types/flight"
import FlightModel from "./database-mapping"

const makeSaveFlights = ({ connection }: { connection: Sequelize }) => {
    return async (flights: Flight[]): Promise<void> => {
        const flightModel = FlightModel(connection);
        await flightModel.sync();

        await connection.transaction(async (transaction) => {
            await flightModel.destroy({ truncate: true, transaction })
            await FlightModel(connection).bulkCreate(flights, { transaction })
        })

        await connection.close()
    }
}

export default makeSaveFlights