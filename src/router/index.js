import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {layout: 'MainLayout'},
        component: Home
    },
    {
        path: '/detail',
        name: 'Detail',
        meta: {layout: 'MainLayout'},
        // component: () => import('../views/Detail.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
