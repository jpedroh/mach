import Ais from 'aisweb-brasil'
import { environment } from '../common/environment'

const AisHandler = new Ais(environment.aisweb.AISWEB_AUTH)

export function fetchMeteorology (airport) {
  return AisHandler.getMeteorology(airport).then(data => data[0][0])
}
