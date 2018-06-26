import axios from 'axios'

export function getEET (departure, arrival) {
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/flights`, {
    params: {
      departure: departure,
      arrival: arrival
    }
  }).then(data => data.data[0].eet)
}
