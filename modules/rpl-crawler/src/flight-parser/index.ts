import { randomUUID } from 'crypto'
import makeFlightParser from './parser.ts'

export { type ParseFlightResult } from './types.ts'

export default makeFlightParser({ uuid: () => randomUUID() })
