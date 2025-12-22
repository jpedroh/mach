import { randomUUID } from 'crypto'
import makeFlightDecoder from './flight-decoder'

export { type ParseFlightResult } from './types'

export default makeFlightDecoder({ uuid: () => randomUUID() })
