import { getAirport, getMeteorology } from '../../axios/airports'

const state = {
  airports: {
    departure: {
      data: {
        icao: null,
        iata: null,
        city: null,
        elevation: null,
        lat: null,
        lng: null,
        name: null,
        runways: [],
        tz: null
      },
      charts: [],
      notams: [],
      weather: {
        metar: null,
        taf: null
      }
    },
    arrival: {
      data: {
        icao: null,
        iata: null,
        city: null,
        elevation: null,
        lat: null,
        lng: null,
        name: null,
        runways: [],
        tz: null
      },
      charts: [],
      notams: [],
      weather: {
        metar: null,
        taf: null
      }
    },
    alternate: {
      data: {
        icao: null,
        iata: null,
        city: null,
        elevation: null,
        lat: null,
        lng: null,
        name: null,
        runways: [],
        tz: null
      },
      charts: [],
      notams: [],
      weather: {
        metar: null,
        taf: null
      }
    }
  },
  weathers: {
    departure: { metar: null, taf: null },
    arrival: { metar: null, taf: null },
    alternate: { metar: null, taf: null }
  }
}

const mutations = {
  setDepartureAirport: (state, payload) => {
    state.airports.departure = payload
  },
  setArrivalAirport: (state, payload) => {
    state.airports.arrival = payload
  },
  setAlternateAirport: (state, payload) => {
    state.airports.alternate = payload
  },
  setDepartureWeather: (state, payload) => {
    state.weathers.departure = payload
  },
  setArrivalWeather: (state, payload) => {
    state.weathers.arrival = payload
  },
  setAlternateWeather: (state, payload) => {
    state.weathers.alternate = payload
  }
}

const getters = {
  airports: state => state.airports,
  weathers: state => state.weathers
}

const actions = {
  startAirports: (context, flight) => {
    return Promise.all([getAirport(flight.departure), getAirport(flight.arrival), getAirport(flight.alternate),
      getMeteorology(flight.departure), getMeteorology(flight.arrival), getMeteorology(flight.alternate)])
      .then(payload => {
        const [ departureData, arrivalData, alternateData, departureWeather, arrivalWeather, alternateWeather ] = payload
        context.commit('setDepartureAirport', departureData)
        context.commit('setArrivalAirport', arrivalData)
        context.commit('setAlternateAirport', alternateData)
        context.commit('setDepartureWeather', departureWeather)
        context.commit('setArrivalWeather', arrivalWeather)
        context.commit('setAlternateWeather', alternateWeather)
        return
      })
  },
  refreshWheater: (context, airports) => {
    return Promise.all([getMeteorology(airports.departure.data.icao), getMeteorology(airports.arrival.data.icao), getMeteorology(airports.alternate.data.icao)])
      .then(payload => {
        const [ departureWeather, arrivalWeather, alternateWeather ] = payload
        context.commit('setDepartureWeather', departureWeather)
        context.commit('setArrivalWeather', arrivalWeather)
        context.commit('setAlternateWeather', alternateWeather)
        return
      })
  },
  newAlternate: (context, alternate) => {
    return Promise.all([getAirport(alternate), getMeteorology(alternate)])
      .then(payload => {
        const [ alternateData, alternateWeather ] = payload
        context.commit('setAlternateAirport', alternateData)
        context.commit('setAlternateWeather', alternateWeather)
        return
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
