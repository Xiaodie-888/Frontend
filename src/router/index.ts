import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/menu/index.vue'),
    },
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: () => import('@/views/error/index.vue')
    },
  ]
})

export default router
