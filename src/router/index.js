import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SensordatenView from '../views/SensordatenView.vue'
import SensorView from '../views/SensorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sensordaten',
      name: 'sensordaten',
      component: SensordatenView
    },
    {
      path: '/sensor',
      name: 'sensor',
      component: SensorView
    }
  ]
})

export default router
