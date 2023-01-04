<template>
  <h3>Index page</h3>
  <RouterLink to="/sign-in">
    To auth
  </RouterLink>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<script setup>
import { RouterLink } from 'vue-router'
</script>
