import makeFlightDecoder from './flight-decoder'
import { v5 as uuid } from 'uuid'

const UUID_NAMESPACE = '618b3d5e-c13f-48e3-ac4c-abb943117b83'

export default makeFlightDecoder({ uuid: line => uuid(line, UUID_NAMESPACE) })
