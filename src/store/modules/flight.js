import axios from 'axios'
import moment from 'moment'
import { fetchEET } from '../../axios/fetch-EET'
import { environment } from '../../common/environment'

const state = {
  flight: {
    alternates: [ ],
    callsign: null,
    aircraft: null,
    arrival: null,
    departure: null,
    alternate: null,
    pob: null,
    eet: null,
    eobt: null,
    eqpt: null,
    fl: null,
    rmk: null,
    route: null,
    fob: null,
    rules: null,
    speed: null,
    wakeTurbulence: null
  },
  utils: {
    altEET: { alternate: null, time: null }
  }
}

const mutations = {
  setFlight (state, data) {
    state.flight = Object.assign(state.flight, data)
  },
  setAlternates (state, data) {
    state.flight.alternates = []
    state.flight.alternates[0] = state.flight.arrival
    state.flight.alternates[1] = data
  },
  updateAlternateData (state, data) {
    state.utils.altEET.alternate = state.flight.alternate
    state.utils.altEET.time = data
  },
  async calculateFob (state) {
    try {
      if (state.utils.altEET.alternate !== state.flight.alternate) {
        state.utils.altEET.alternate = state.flight.alternate
        state.utils.altEET.time = await fetchEET(state.flight.arrival, state.flight.alternate)
      }
      const altEET = moment(state.utils.altEET.time, 'HHmm')
      const altMinutes = (altEET.hour() * 60) + altEET.minute()
      const rteEET = moment(state.flight.eet, 'HHmm')
      const rteMinutes = (rteEET.hour() * 60) + rteEET.minute()
      const autonomia = moment.duration({ minutes: rteMinutes + (0.1 * rteMinutes) + 30 + altMinutes })
      state.flight.fob = moment.utc(autonomia.asMilliseconds()).format('HHmm')
    } catch (error) {
      state.flight.fob = '0000'
      console.error(error)
    }
  },
  setCallsign (state, callsign) {
    state.flight.callsign = callsign.toUpperCase().trim()
  },
  setAircraft (state, aircraft) {
    state.flight.aircraft = aircraft.toUpperCase().trim()
  },
  setArrival (state, arrival) {
    state.flight.arrival = arrival.toUpperCase().trim()
  },
  setDeparture (state, departure) {
    state.flight.departure = departure.toUpperCase().trim()
  },
  setAlternate (state, alternate) {
    if (alternate == null) {
      state.flight.alternate = null
      return
    }
    state.flight.alternate = alternate.toUpperCase().trim()
  },
  setPob (state, pob) {
    state.flight.pob = parseInt(pob)
  },
  setEet (state, eet) {
    state.flight.eet = eet.toUpperCase().trim()
  },
  setEobt (state, eobt) {
    state.flight.eobt = eobt.toUpperCase().trim()
  },
  setEqpt (state, eqpt) {
    state.flight.eqpt = eqpt.toUpperCase().trim()
  },
  setFl (state, fl) {
    state.flight.fl = fl
  },
  setRmk (state, rmk) {
    state.flight.rmk = rmk.toUpperCase().trim()
  },
  setRoute (state, route) {
    state.flight.route = route.toUpperCase().trim()
  },
  setFob (state, fob) {
    state.flight.fob = fob
  },
  setRules (state, rules) {
    state.flight.rules = rules.toUpperCase().trim()
  },
  setSpeed (state, speed) {
    state.flight.speed = speed.toUpperCase().trim()
  },
  setWakeTurbulence (state, wakeTurbulence) {
    state.flight.wakeTurbulence = wakeTurbulence.toUpperCase().trim()
  }
}

const getters = {
  callsign: state => state.flight.callsign,
  aircraft: state => state.flight.aircraft,
  arrival: state => state.flight.arrival,
  departure: state => state.flight.departure,
  alternate: state => state.flight.alternate,
  pob: state => state.flight.pob,
  eet: state => state.flight.eet,
  eobt: state => state.flight.eobt,
  eqpt: state => state.flight.eqpt,
  fl: state => state.flight.fl,
  rmk: state => state.flight.rmk,
  route: state => state.flight.route,
  fob: state => state.flight.fob,
  rules: state => state.flight.rules,
  speed: state => state.flight.speed,
  wakeTurbulence: state => state.flight.wakeTurbulence,
  flight: state => state.flight
}

const actions = {
  flightModal: (context, data) => {
    context.commit('setAlternate', null)
    context.commit('setFob', null)
    context.commit('setPob', null)
    context.commit('setFlight', data)
    if (context.state.flight.alternates[0] === data.arrival) {
      return
    }
    return axios.get(`${environment.api.BASE_URL}/flights?departure=${data.arrival}`)
      .then(({data}) => context.commit('setAlternates', [...new Set(data.sort(orderArray).map(element => element.arrival))].slice(0, 8)))
  },
  calculateFob: (context) => {
    if (context.state.utils.altEET.alternate !== context.state.flight.alternate) {
      return fetchEET(context.state.flight.arrival, context.state.flight.alternate)
        .then(data => {
          context.commit('updateAlternateData', data)
          const altEET = moment(context.state.utils.altEET.time, 'HHmm')
          const altMinutes = (altEET.hour() * 60) + altEET.minute()
          const rteEET = moment(context.state.flight.eet, 'HHmm')
          const rteMinutes = (rteEET.hour() * 60) + rteEET.minute()
          const autonomia = moment.duration({ minutes: rteMinutes + (0.1 * rteMinutes) + 30 + altMinutes })
          context.commit('setFob', moment.utc(autonomia.asMilliseconds()).format('HHmm'))
        })
        .catch(error => {
          context.commit('setFob', '0000')
          console.error(error)
        })
    } else {
      const altEET = moment(context.state.utils.altEET.time, 'HHmm')
      const altMinutes = (altEET.hour() * 60) + altEET.minute()
      const rteEET = moment(context.state.flight.eet, 'HHmm')
      const rteMinutes = (rteEET.hour() * 60) + rteEET.minute()
      const autonomia = moment.duration({ minutes: rteMinutes + (0.1 * rteMinutes) + 30 + altMinutes })
      context.commit('setFob', moment.utc(autonomia.asMilliseconds()).format('HHmm'))
    }
  }
}

function orderArray (a, b) {
  if (a.eet > b.eet) {
    return 1
  } else if (a.eet < b.eet) {
    return -1
  }
  return 0
}

export default {
  state,
  mutations,
  getters,
  actions
}
