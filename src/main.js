import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faClock, faDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Notifications from 'vue-notification'
import VueSocketio from 'vue-socket.io'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'
import { environment } from './common/environment'
import router from './router'
import store from './store'

library.add(faExternalLinkAlt, faCalendarAlt, faDownload, faClock)
// Configs
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSocketio, 'http://localhost:5050')
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: environment.google.ANALYTICS_KEY,
  router
})
Vue.use(VueGoogleMaps, {
  load: {
    key: environment.google.MAPS_KEY
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
