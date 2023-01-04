import { defineStore } from 'pinia'
import { router } from '@/router'

import cookie from '@/helpers/cookieMethods'
import fetchWrapper from '@/helpers/fetchWrapper'
import { LOGIN, FETCH_USER, TOKEN_PREFIX, TOKEN_NAME } from '@/constants/auth'
import { SIGN_IN } from '@/constants/routeNames'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null,
  }),
  getters: {},
  actions: {
    login (body) {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .post(LOGIN, { body })
          .then((data) => {
            cookie.set(`${TOKEN_PREFIX}_${TOKEN_NAME}`, data.access)

            return this.fetchUser()
          })
          .then((data) => {
            resolve(data)
            router.push(this.returnUrl || '/')
          })
          .catch((err) => {
            this.logout()
            reject(err)
          })
      })
    },
    fetchUser () {
      return new Promise((resolve, reject) => {
        fetchWrapper
          .get(FETCH_USER)
          .then((data) => {
            this.user = data
            localStorage.setItem('user', JSON.stringify(data))
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout () {
      this.user = null
      localStorage.removeItem('user')
      cookie.delete(`${TOKEN_PREFIX}_${TOKEN_NAME}`)
      router.push({ name: SIGN_IN.name })
    },
  },
})
