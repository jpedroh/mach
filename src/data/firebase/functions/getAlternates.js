import db from '../firebaseInit'

export function getAlternates (apt) {
  return db.where('departure', '==', apt).orderBy('eet', 'asc').get().then(flights => {
    const flightsArray = []
    flights.forEach(flight => {
      flightsArray.push(flight.data().arrival)
    })
    return [ ...new Set(flightsArray) ].slice(0, 5)
  })
}
