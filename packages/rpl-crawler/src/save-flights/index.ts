import makeSaveFlights from "./save-flights";
import { Sequelize } from "sequelize";

export default makeSaveFlights({
    connection: new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:secret@172.17.0.2:5432/postgres', {
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