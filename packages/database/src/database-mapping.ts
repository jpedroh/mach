import { DataTypes, Model, Sequelize } from 'sequelize'
import FlightType from '@mach/common'

export interface FlightModel extends Model<FlightType>, FlightType {}

const Flight = (sequelize: Sequelize) => {
  return sequelize.define<FlightModel>(
    'flight',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      callsign: {
        type: DataTypes.STRING,
        allowNull: false
      },
      beginDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flightNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      aircraft: {
        type: DataTypes.JSON,
        allowNull: false
      },
      departureIcao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estimatedOffBlockTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cruisingSpeed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weekdays: {
        type: DataTypes.JSON,
        allowNull: false
      },
      cruisingLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      route: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalIcao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estimatedEnrouteMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      flightRules: {
        type: DataTypes.STRING,
        allowNull: false
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'flights',
      timestamps: true
    }
  )
}

export default Flight
