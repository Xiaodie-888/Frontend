import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/menu/index.vue'),
      children: [
        {
          path: '/set',
          name: 'set',
          component: () => import('@/views/set/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
        },
      ],
    },
  ],
})

export default router
