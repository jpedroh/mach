// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'
import * as VueGoogleMaps from 'vue2-google-maps'
import { analyticsKey, mapsKey } from './config'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
  template: '<App/>',
  components: { App }
})
