<template>
  <div>
    <AppContentTemplateVue>
      <template #header>
        <h3>Dashboard</h3>
      </template>
    </AppContentTemplateVue>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage'
}
</script>

<script setup>
import AppContentTemplateVue from '@/components/ui/app-content-template.vue'
</script>
