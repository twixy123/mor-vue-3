import { createRouter, createWebHistory } from 'vue-router'
import supportRoutes from './support'
import { useAuthStore } from '@/stores/auth'

import cookie from '@/helpers/cookieMethods'
import setPageTitle from '@/helpers/setPageTitle'

import routeNames from '@/constants/routeNames'

import IndexPage from '@/pages/index.vue'

const TOKEN_PREFIX = import.meta.env.VITE_AUTH_TOKEN_PREFIX

import { TOKEN_NAME } from '@/constants/auth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...supportRoutes,
    {
      path: routeNames.INDEX.path,
      name: routeNames.INDEX.name,
      component: IndexPage,
      meta: {
        auth: true,
        layout: 'main',
        title: routeNames.INDEX.title
      },
      redirect: '/dashboard'
    },
    {
      path: routeNames.DASHBOARD.path,
      name: routeNames.DASHBOARD.name,
      component: () => import('@/pages/dashboard/index.vue'),
      meta: {
        auth: true,
        layout: 'main',
        title: routeNames.DASHBOARD.title
      }
    },
    {
      path: routeNames.SIGN_IN.path,
      name: routeNames.SIGN_IN.name,
      component: () => import('@/pages/sign-in.vue'),
      meta: {
        auth: false,
        layout: 'auth',
        title: routeNames.SIGN_IN.title
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  setPageTitle(to.meta.title)
  let token = null

  if (cookie.get(`${TOKEN_PREFIX}_${TOKEN_NAME}`))
    token = cookie.get(`${TOKEN_PREFIX}_${TOKEN_NAME}`)

  const authRequired = to.meta.auth
  const auth = useAuthStore()

  if (authRequired && (!token || !auth.user)) {
    auth.returnUrl = to.fullPath
    auth.logout()
  } else next()
})
