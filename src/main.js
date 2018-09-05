import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import store from './store'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VueSocketio from 'vue-socket.io'
import Notifications from 'vue-notification'
import * as VueGoogleMaps from 'vue2-google-maps'
import { analyticsKey, mapsKey } from './config'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt, faCalendarAlt, faDownload, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExternalLinkAlt, faCalendarAlt, faDownload, faClock)
// Configs
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSocketio, 'http://localhost:5050')
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: analyticsKey,
  router
})
Vue.use(VueGoogleMaps, {
  load: {
    key: mapsKey
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore')
    console.log()
  },
  template: '<App/>',
  components: { App }
})

store.subscribe((mutation, state) => localStorage.setItem('store', JSON.stringify(state)))
