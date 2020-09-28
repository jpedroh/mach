import makeSaveFlights from './save-flights'
import connection, { FlightModel as model } from '@mach/database'

export default makeSaveFlights({ connection, model })
