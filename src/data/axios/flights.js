import axios from 'axios'

export function getAlternates (departure) {
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/flights`, {
    params: {
      departure: departure
    }
  }).then(data => {
    const alternates = []
    data.data.sort(orderArray).forEach(element => {
      alternates.push(element.arrival)
    })
    return [...new Set(alternates)].slice(0, 8)
  })
}

function orderArray (a, b) {
  if (a.eet > b.eet) {
    return 1
  } else if (a.eet < b.eet) {
    return -1
  }
  return 0
}
