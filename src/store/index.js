import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
