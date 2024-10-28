import { createRouter, createWebHistory } from 'vue-router'
import WebIndex from '../views/web/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WebIndex
    },
  ]
})

export default router
