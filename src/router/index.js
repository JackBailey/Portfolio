import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  // redirect contact to home
  {
    meta: {
      title: "Contact"
    },
    path: '/contact',
    component: () => import(/* webpackChunkName: "about" */ '../components/index/contact.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
