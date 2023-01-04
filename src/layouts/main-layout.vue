<template>
  <v-app>
    <MainSidebar />
    <v-main>
      <div class="px-8 py-4 h-100">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import MainSidebar from '@/components/sidebar/main-sidebar.vue'
</script>
