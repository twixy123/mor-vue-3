<template>
  <v-app>
    <v-main>
      <div :class="$style['block']">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<script setup>
import { RouterView } from 'vue-router'
import { useCssModule } from 'vue'

const $style = useCssModule()
</script>

<style lang="scss" module>
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($primary, 0.3);
  width: 100%;
  height: 100%;
}
</style>
