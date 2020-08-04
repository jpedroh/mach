import makeSaveFlights from "./save-flights";
import { Sequelize } from "sequelize";

export default (databaseUrl: string) => makeSaveFlights({
    connection: new Sequelize(databaseUrl, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
})