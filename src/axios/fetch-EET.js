import axios from 'axios'
import { environment } from '../common/environment'

export function fetchEET (departure, arrival) {
  return axios.get(`${environment.api.BASE_URL}/flights`, {
    params: {
      departure: departure,
      arrival: arrival
    }
  })
  .then(data => data.data[0].eet)
}
