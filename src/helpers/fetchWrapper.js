import cookie from './cookieMethods'
import { useAuthStore } from '@/stores/auth'
import {
  TOKEN_NAME,
  FETCH_USER,
  TOKEN_PREFIX,
  TOKEN_TYPE,
} from '@/constants/auth'

const API_URL = `${import.meta.env.VITE_API_URL}/dashboard`

const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  patch: request('PATCH'),
  delete: request('DELETE'),
}

function request (method) {
  return (url, {body = {}, params = {}} = {}, media = false) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    }

    const hasBody = Object.keys(body).length
    const hasParams = Object.keys(params).length

    if (hasBody || hasParams) {
      requestOptions.headers['Content-Type'] = media
        ? 'multipart/form-data'
        : 'application/json'

      if (hasBody) {
        requestOptions.body = ''
        requestOptions.body = JSON.stringify(body)
      }
    }
    let curerntUrl = url

    if (hasParams) {
      const urlParams = new URLSearchParams(params).toString()

      curerntUrl += `?${urlParams}`
    }

    return fetch(curerntUrl, requestOptions).then(handleResponse)
  }
}

// helper functions

function authHeader (url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = cookie.get(`${TOKEN_PREFIX}_${TOKEN_NAME}`)
  const isLoggedIn = !!token
  const isApiUrl = url.startsWith(API_URL)
  const isFetchUserUrl = url.startsWith(FETCH_USER)

  if (isLoggedIn && (isApiUrl || isFetchUserUrl)) {
    return { Authorization: `${TOKEN_TYPE} ${token}` }
  } else {
    return {}
  }
}

function handleResponse (response) {
  return response.json().then((data) => {
    if (!response.ok) {
      const { user, logout } = useAuthStore()

      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout()
      }

      const error =
        (data && data.errors?.length && data.errors[0].message) ||
        response.statusText

      return Promise.reject(new Error(error))
    }

    return data
  })
}

export default fetchWrapper
