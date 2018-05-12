import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing/Index.vue'
import Flights from '@/components/Flights/Index.vue'
import Briefing from '@/components/Briefing/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/briefing',
      name: 'Briefing',
      component: Briefing
    },
    {
      path: '/',
      name: 'Flights',
      component: Flights
    },
    {
      path: '/landing',
      name: 'Landing',
      component: Landing
    }
  ]
})
