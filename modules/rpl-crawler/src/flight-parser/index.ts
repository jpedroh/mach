import { randomUUID } from 'crypto'
import makeFlightParser from './parser'

export { type ParseFlightResult } from './types'

export default makeFlightParser({ uuid: () => randomUUID() })
