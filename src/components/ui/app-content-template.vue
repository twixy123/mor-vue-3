<template>
  <div
    :class="[
      $style['block'],
      {
        [$style['block_with_header']]: $slots.header,
      },
    ]"
  >
    <div
      v-if="$slots.header"
      :class="[$style['block_header'], ...headerClasses]"
      :data-background-color="headerColor"
    >
      <slot name="header" />
    </div>
    <div :class="[$style['block_body'], ...bodyClasses]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContentTemplate'
}
</script>

<script setup>
import { useCssModule } from 'vue'
defineProps({
  headerClasses: {
    type: Array,
    default: () => []
  },
  bodyClasses: {
    type: Array,
    default: () => []
  },
  headerColor: {
    type: String,
    default: 'blue'
  }
})

const $style = useCssModule()
</script>

<style lang="scss" module>
/* $orange-line-gradient-light: map-get($orange, 'lighten-2');
$orange-line-gradient-dark: map-get($deep-orange, 'darken-2');

$blue-line-gradient-light: map-get($blue, 'lighten-2');
$blue-line-gradient-dark: map-get($blue, 'darken-2');

$black-line-gradient-light: map-get($grey, 'darken-4');
$black-line-gradient-dark: map-get($shades, 'black'); */

.block {
  align-items: center;
  background-color: $white;
  border-radius: 4px;
  box-shadow: 0px 0px 30px rgba($black, 0.2);
  display: flex;
  flex-direction: column;

  &_header {
    border-radius: 4px;
    color: $white;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem 0.75rem;
    width: calc(100% - 1.5rem);

    &[data-background-color='orange'] {
      background-image: linear-gradient(
        300deg,
        $orange-line-gradient-light,
        $orange-line-gradient-dark
      );
      box-shadow: 0px 5px 10px rgba($orange-line-gradient-dark, 0.5);
    }

    &[data-background-color='blue'] {
      background-image: linear-gradient(
        300deg,
        $blue-line-gradient-light,
        $blue-line-gradient-dark
      );
      box-shadow: 0px 5px 10px rgba($blue-line-gradient-dark, 0.5);
    }

    &[data-background-color='black'] {
      background-image: linear-gradient(
        333deg,
        $black-line-gradient-light,
        $black-line-gradient-dark
      );
      box-shadow: 0px 5px 10px $black-line-gradient-light;
    }
  }

  &:not(.block_with_header) {
    padding: 0.75rem;
  }

  &.block_with_header {
    margin-top: 0.5rem;
    padding-bottom: 0.75rem;

    .block_body {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  &_body {
    width: 100%;
  }
}
</style>
