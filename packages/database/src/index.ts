import { Sequelize } from 'sequelize'
import FlightModelInitializer from './database-mapping'
const pg = require('pg');

export const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const FlightModel = FlightModelInitializer(connection)

export default connection
