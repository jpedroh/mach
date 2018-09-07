import { fetchAirport } from '../../axios/fetch-airport'
import { fetchMeteorology } from '../../axios/fetch-meteorology'

const state = {
  airports: [],
  briefing: false
}

const mutations = {
  setAirports: (state, payload) => {
    state.airports = payload
  },
  createBriefing: state => {
    state.briefing = true
  },
  setAirportMeteorology: (state, payload) => {
    state.airports[0].meteorology = payload[0]
    state.airports[1].meteorology = payload[1]
    state.airports[2].meteorology = payload[2]
  },
  changeAlternate: (state, payload) => {
    state.airports[2] = payload
    location.reload()
  }
}

const getters = {
  airports: state => state.airports,
  hasBriefing: state => state.briefing
}

const actions = {
  startAirports: (context, flight) => {
    context.commit('createBriefing')
    return Promise.all([fetchAirport(flight.departure), fetchAirport(flight.arrival), fetchAirport(flight.alternate)])
      .then(payload => context.commit('setAirports', payload))
  },
  refreshMeteorology: (context, airports) => {
    return Promise.all([fetchMeteorology(airports[0].rotaer.AeroCode), fetchMeteorology(airports[1].rotaer.AeroCode), fetchMeteorology(airports[2].rotaer.AeroCode)])
      .then(payload => context.commit('setAirportMeteorology', payload))
  },
  newAlternate: (context, alternate) => {
    return fetchAirport(alternate)
      .then(payload => context.commit('changeAlternate', payload))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
