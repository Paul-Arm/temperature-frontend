import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import SensordatenView from '../views/SensordatenView.vue'
import SensorView from '../views/SensorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/:pathMatch(.*)*', component: Login },
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      component: Dashboard, 
      meta: { requiresAuth: true } 
    },
    {
      path: '/sensordaten',
      name: 'sensordaten',
      component: SensordatenView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sensor',
      name: 'sensor',
      component: SensorView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
