import db from '../firebaseInit'

export function getFlightsDepArr (query) {
  return db.where('departure', '==', query.departure.toUpperCase()).where('arrival', '==', query.arrival.toUpperCase()).get().then(flights => {
    const flightsArray = []
    flights.forEach(flight => {
      flightsArray.push(flight.data())
    })
    return flightsArray
  })
}

export function getFlightsDep (query) {
  return db.where('departure', '==', query.departure.toUpperCase()).get().then(flights => {
    const flightsArray = []
    flights.forEach(flight => {
      flightsArray.push(flight.data())
    })
    return flightsArray
  })
}

export function getFlightsArr (query) {
  return db.where('arrival', '==', query.arrival.toUpperCase()).get().then(flights => {
    const flightsArray = []
    flights.forEach(flight => {
      flightsArray.push(flight.data())
    })
    return flightsArray
  })
}
