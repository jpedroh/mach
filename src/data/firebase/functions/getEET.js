import db from '../firebaseInit'

export async function getEET (dep, arr) {
  return db.where('departure', '==', dep).where('arrival', '==', arr).limit(1).get().then(flights => {
    if (flights.empty) {
      return null
    }
    let eet = 0
    flights.forEach(flight => {
      eet = flight.data().eet
    })
    return eet
  })
}
