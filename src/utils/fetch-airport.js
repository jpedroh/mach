import Ais from 'aisweb-brasil'
import { aisKey } from '../config'

const AisHandler = new Ais(aisKey)

export async function fetchAirport (airport) {
  const object = new Airport(airport)
  return AisHandler.getCharts(airport)
    .then(data => {
      object.charts = data[0]
      return AisHandler.getNotams(airport)
    })
    .then(data => {
      object.notams = data[0]
      return AisHandler.getMeteorology(airport)
    })
    .then(data => {
      object.meteorology = data[0][0]
      return AisHandler.getAipSuplements(airport)
    })
    .then(data => {
      object.aip = data[0]
      return AisHandler.getRotaer(airport)
    })
    .then(data => {
      object.rotaer = data[0][0]
      return object
    })
    .catch(_ => object)
}

export class Airport {
  icao
  charts
  notams
  rotaer
  aip
  meteorology

  constructor (icao) {
    this.icao = icao
  }

}
