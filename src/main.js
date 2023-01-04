import { createApp, shallowRef, computed } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Vuetify
import vuetify from './plugins/vuetify'
app.use(vuetify)
// Vuetify

import './assets/main.scss'

// Loader
import loader from './plugins/loader'
app.use(loader, { shallowRef, computed })
// Loader

// Notifications
import notify from './plugins/notify'
app.use(notify)
// Notifications

// Fetch to Dashboard Api
import api from './plugins/api'
app.use(api)
// Fetch to Dashboard Api

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'
app.use(CKEditor)
// CKEditor

app.mixin({
  mounted () {
    this.$el.__vue__ = this // Or __vue__ for backwards compatibility.
  }
})

app.mount('#app')
