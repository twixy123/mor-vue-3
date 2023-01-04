<template>
  <div :class="[$style['block']]">
    <p v-if="!modelValue" :class="$style['placeholder']">
      {{ placeholder }}
    </p>
    <select
      ref="selectRef"
      :value="modelValue"
      @change="emits('update:modelValue', $event.target.value)"
    >
      <option v-for="(option, key) in options" :key="key" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span :class="$style['swap-btn']">
      <v-icon :icon="mdiMenuSwap" color="shades-black" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
}
</script>

<script setup>
import { useCssModule, ref } from 'vue'
import { mdiMenuSwap } from '@mdi/js'
defineProps({
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
})

const emits = defineEmits(['update:modelValue'])

const $style = useCssModule()

const selectRef = ref(null)
</script>

<style lang="scss" module>
.block {
  position: relative;
  background: $white;
  border-radius: 5px;
  border: 1px solid $black;

  select {
    cursor: pointer;
    line-height: 34px;
    background: transparent;
    width: 100%;
    outline: none;
    padding-right: 34px;
    padding-left: 12px;
    appearance: none;
    position: relative;
    z-index: 2;
  }

  .swap-btn {
    height: 34px;
    width: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    z-index: 1;
  }

  .placeholder {
    position: absolute;
    line-height: 34px;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    color: $black;
    padding-left: 12px;
  }
}
</style>
