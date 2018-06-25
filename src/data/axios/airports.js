import axios from 'axios'

export async function fetchAllAirports ({ departure, arrival, alternate }) {
  return {
    departure: await fetchAirport(departure),
    arrival: await fetchAirport(arrival),
    alternate: await fetchAirport(alternate)
  }
}

function fetchAirport (airport) {
  if (localStorage[airport]) {
    return JSON.parse(localStorage[airport])
  }
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/airports/${airport}`)
    .then(data => {
      localStorage[airport] = JSON.stringify(data.data)
      return data.data
    })
}
