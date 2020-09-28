import { Sequelize } from 'sequelize'
import FlightModelInitializer from './database-mapping'

export const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const FlightModel = FlightModelInitializer(connection)

export default connection
