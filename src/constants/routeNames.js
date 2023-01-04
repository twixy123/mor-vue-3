const routeNames = {
  INDEX: {
    path: '/',
    name: 'indexPage',
    title: 'Main'
  },
  DASHBOARD: {
    path: '/dashboard',
    name: 'dashboard',
    title: 'Dashboard'
  },
  SUPPORT: {
    path: '/support',
    name: 'supportMainPage',
    title: 'Support'
  },
  SUPPORT_FAQ: {
    path: '/support/faq',
    name: 'faq',
    title: 'FAQ'
  },
  SUPPORT_FAQ_DETAIL: {
    path: '/support/faq/:id',
    name: 'faq-id',
    title: 'FAQ'
  },
  SUPPORT_TERMS: {
    path: '/support/terms',
    name: 'terms',
    title: 'Terms of use'
  },
  SIGN_IN: {
    path: '/sign-in',
    name: 'login',
    title: 'Sign in'
  }
}

export const {
  INDEX,
  DASHBOARD,
  SUPPORT,
  SUPPORT_FAQ,
  SUPPORT_FAQ_DETAIL,
  SUPPORT_TERMS,
  SIGN_IN
} = routeNames

export default routeNames
