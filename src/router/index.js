import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'MainLayout' },
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: { layout: 'DetailLayout' },
    component: Detail,
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10)
      if (Number.isNaN(id)) {
        return 0
      }
      return { id }
    }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
