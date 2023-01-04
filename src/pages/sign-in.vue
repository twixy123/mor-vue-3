<template>
  <v-card class="pa-4" width="400">
    <h3 class="text-center mb-2">
      Sign in
    </h3>
    <v-img
      width="200"
      src="/images/svg/logo.svg"
      cover
      class="mb-6 mx-auto"
    />
    <FormSignIn @submit="onSubmit" />
  </v-card>
</template>

<script setup>
import FormSignIn from '@/components/form/form-sign-in.vue'

import { inject } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const loader = inject('loader')
const handleError = inject('handleError')

async function onSubmit (requestData) {
  loader.show()

  try {
    await authStore.login(requestData)
  } catch (error) {
    handleError(error)
  } finally {
    loader.hide()
  }
}
</script>
