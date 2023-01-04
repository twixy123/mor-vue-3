<template>
  <div>
    <FetchItems :get-items="getItems" search filter-by-date>
      <template #pageTitle>
        <h3>FAQ Page</h3>
      </template>
      <template #default="{ items, count }">
        <div class="w-100 d-flex justify-end mb-4">
          <v-btn
            variant="outlined"
            color="info"
            disabled
            class="mr-2"
          >
            Count: {{ count }}
          </v-btn>
          <v-btn variant="flat" color="info">
            Create
          </v-btn>
        </div>
        <v-table class="table" density="compact">
          <colgroup>
            <col style="width: calc(100% - 200px)">
            <col style="width: 200px">
          </colgroup>
          <thead>
            <tr>
              <th class="text-left text-h5">
                Question
              </th>
              <th class="text-left text-h5">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>
                <RouterLink
                  :to="{
                    name: SUPPORT_FAQ_DETAIL.name,
                    params: { id: item.id },
                  }"
                  class="w-100 d-flex py-3"
                >
                  {{ item.question }}
                </RouterLink>
              </td>
              <td class="td">
                {{ item.created_date }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </FetchItems>
  </div>
</template>

<script>
export default {
  name: 'FAQPage',
}
</script>

<script setup>

import FetchItems from '@/components/layout/fetch-items-layout-with-pagination.vue'

import { SUPPORT_FAQ_DETAIL } from '@/constants/routeNames'

import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const api = inject('api')

function getItems (requestData) {
  return new Promise((resolve, reject) => {
    api.support
      .getFAQList(requestData)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
</script>
