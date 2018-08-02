import axios from 'axios'
import moment from 'moment'

const state = {
  flights: []
}

const mutations = {
  fetchFlights: (state, data) => {
    state.flights = data
      .map(value => {
        value.days = printDays(value.days)
        value.beginDate = formatDate(value.beginDate)
        value.endDate = value.endDate == null ? 'UFN' : formatDate(value.endDate)
        return value
      })
  }
}

const getters = {
  flightsTable: state => state.flights
}

const actions = {
  fetchFlights: (context, form) => {
    const query = {}
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        query[key] = form[key].toUpperCase()
      }
    })
    return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/flights`, {
      params: query
    })
    .then(({data}) => context.commit('fetchFlights', data))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}

function printDays (days) {
  if (days === '1234567') {
    return 'DIÁRIO'
  }
  return days.replace(/1/, 'DOM').replace(/2/, 'SEG').replace(/3/, 'TER').replace(/4/, 'QUA').replace(/5/, 'QUI').replace(/6/, 'SEX').replace(/7/, 'SAB').replace(/0/g, '').match(/.{3}/g).join('-')
}

function formatDate (date) {
  return moment(date).format('DD/MM/YYYY')
}
