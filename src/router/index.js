import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing/Index.vue'
import Flights from '@/components/Flights/Index.vue'
import Briefing from '@/components/Briefing/Index.vue'
import Developers from '@/components/Developers/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/developers',
      name: 'Developers',
      component: Developers
    },
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
