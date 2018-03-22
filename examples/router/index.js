import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TryIt from '@/components/TryIt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TryIt',
      component: TryIt
    }, {
      path: '/help',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
