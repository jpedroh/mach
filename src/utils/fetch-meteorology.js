import Ais from 'aisweb-brasil'
import { aisKey } from '../config'

const AisHandler = new Ais(aisKey)

export function fetchMeteorology (airport) {
  return AisHandler.getMeteorology(airport).then(data => data[0][0])
}
