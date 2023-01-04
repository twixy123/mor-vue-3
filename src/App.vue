<template>
  <notifications
    position="top center"
    :classes="$style['notification']"
    :max="3"
  />
  <div v-show="overlay" :class="$style['overlay']">
    <v-progress-circular indeterminate size="64" color="primary" />
  </div>
  <div :class="$style['block']">
    <transition name="fade">
      <component :is="currentComponent" />
    </transition>
  </div>
</template>

<script setup>
import { shallowRef, watch, useCssModule, inject } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/main-layout.vue'
import AuthLayout from '@/layouts/auth-layout.vue'

const route = useRoute()
const $style = useCssModule()

const currentComponent = shallowRef(MainLayout)

const { value: overlay } = inject('loader') // Injected from main.js

function setCurrentComponent (routeName) {
  if (routeName === 'main') {
    currentComponent.value = MainLayout
  } else {
    currentComponent.value = AuthLayout
  }
}

watch(
  () => route,
  (_route) => setCurrentComponent(_route.meta.layout),
  {
    immediate: true,
    deep: true,
  }
)
</script>

<style lang="scss" module>
.block {
}

.notification {
  border: none !important;
  padding: 8px;
  border-radius: 5px;
  margin-top: 15px;
  font-size: 14px;

  &:global(.success) {
    background: $success;
    color: $white;
  }

  &:global(.error) {
    background: $error;
    color: $white;
  }
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  & > * {
    z-index: 2;
    position: relative;
  }

  &::before {
    content: '';
    display: block;
    background: $black;
    opacity: 33%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
