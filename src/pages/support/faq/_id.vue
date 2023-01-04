<template>
  <AppContentTemplate>
    <template #header>
      <h3>Detail Page</h3>
    </template>
    <template #default>
      <FormSupport
        v-if="Object.keys(faq).length"
        ref="formSupport"
        :initial-data="faq"
        @submit="onSubmit"
      >
        <template #actions>
          <div class="d-flex justify-end mt-6">
            <v-btn type="submit" color="info">
              Submit
            </v-btn>
          </div>
        </template>
      </FormSupport>
      <p v-else>
        No data to display
      </p>
    </template>
  </AppContentTemplate>
</template>

<script>
export default {
  name: 'FAQPageDetail',
}
</script>

<script setup>
import AppContentTemplate from '@/components/ui/app-content-template.vue'
import FormSupport from '@/components/support/form-support.vue'

import { useRoute } from 'vue-router'
import { onBeforeMount, reactive, inject, ref } from 'vue'
import api from '@/helpers/api'

const route = useRoute()
const handleError = inject('handleError')
const loader = inject('loader')

const faq = reactive({})
const formSupport = ref(null)

onBeforeMount(async () => {
  await getFAQDetail()
})

async function getFAQDetail () {
  loader.show()

  try {
    const data = await api.support.getFAQ({}, { id: route.params.id })

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        faq[key] = data[key]
      }
    }
  } catch (error) {
    handleError(error)
  } finally {
    loader.hide()
  }
}

async function onSubmit (val) {
  try {
    await api.support.updateFAQ({body: val}, { id: route.params.id })
    await getFAQDetail()

    formSupport.value.setFormFields(faq.value)
  } catch (error) {
    handleError(error)
  } finally {
    loader.hide()
  }
}
</script>
