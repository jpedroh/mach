import makeSaveFlights from "./save-flights";
import connection, {FlightModel as model} from '@mach-flight-planning/database'

export default makeSaveFlights({connection, model})