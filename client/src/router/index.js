import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CartPage from '../views/CartPage.vue'
import FavoritePage from '../views/FavoritePage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import TransactionPage from '../views/TransactionPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserPage.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailPage
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionPage
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage
    }
  ]
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
  } else if (!isAuthenticated && (to.name === 'cart' || to.name === 'favorite')) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You must signed in first!'
    })
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
