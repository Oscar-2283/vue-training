import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'
    ),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'CartView',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'ProductView',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'LogIn',
        component: () => import('../views/front/LogIn.vue')
      }
    ]
  },
  {
    path: '/BackAdmin',
    component: () => import('../views/back/BackAdmin.vue'),
    children: [
      {
        path: 'ProductsView',
        component: () => import('../views/back/ProductsView.vue')
      },
      {
        path: 'OrderView',
        component: () => import('../views/back/OrderView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
