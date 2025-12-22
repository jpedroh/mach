import { randomUUID } from 'crypto'
import makeFlightDecoder from './parser'

export { type ParseFlightResult } from './types'

export default makeFlightDecoder({ uuid: () => randomUUID() })
