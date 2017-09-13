import Vue from 'vue'
import Router from 'vue-router'
import Voos from '@/components/Voos'
import Briefing from '@/components/Briefing'
import Api from '@/components/api/Api'
import ApiDoc from '@/components/api/ApiDoc'
import Selecao from '@/components/Selecao'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'voos',
      component: Voos
    },
    {
      path: '/briefing',
      name: 'briefing',
      component: Briefing
    },
    {
      path: '/selecao',
      name: 'selecao',
      component: Selecao
    },
    {
      path: '/api',
      name: 'api',
      component: Api
    },
    {
      path: '/api/doc',
      name: 'apidoc',
      component: ApiDoc
    }
  ]
})
