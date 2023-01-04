import routeNames from '@/constants/routeNames'

export default [
  {
    path: routeNames.SUPPORT.path,
    name: routeNames.SUPPORT.name,
    component: () => import('@/pages/support/index.vue'),
    meta: {
      auth: true,
      layout: 'main',
      title: routeNames.SUPPORT.title
    },
    redirect: routeNames.SUPPORT_FAQ.path
  },
  {
    path: routeNames.SUPPORT_FAQ.path,
    name: routeNames.SUPPORT_FAQ.name,
    component: () => import('@/pages/support/faq/index.vue'),
    meta: {
      auth: true,
      layout: 'main',
      inheritedFrom: routeNames.SUPPORT.name,
      title: routeNames.SUPPORT_FAQ.title
    }
  },
  {
    path: routeNames.SUPPORT_FAQ_DETAIL.path,
    name: routeNames.SUPPORT_FAQ_DETAIL.name,
    component: () => import('@/pages/support/faq/_id.vue'),
    meta: {
      auth: true,
      layout: 'main',
      inheritedFrom: routeNames.SUPPORT_FAQ.name,
      title: routeNames.SUPPORT_FAQ_DETAIL.title
    }
  },
  {
    path: routeNames.SUPPORT_TERMS.path,
    name: routeNames.SUPPORT_TERMS.name,
    component: () => import('@/pages/support/terms/index.vue'),
    meta: {
      auth: true,
      layout: 'main',
      inheritedFrom: routeNames.SUPPORT.name,
      title: routeNames.SUPPORT_TERMS.title
    }
  }
]
