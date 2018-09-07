import axios from 'axios'
import { environment } from '../common/environment'

export function fetchFlights (form) {
  const query = {}
  Object.keys(form).forEach((key) => {
    if (form[key] !== null) {
      query[key] = form[key].toUpperCase()
    }
  })
  return axios.get(`${environment.api.BASE_URL}/flights`, {
    params: query
  })
}
