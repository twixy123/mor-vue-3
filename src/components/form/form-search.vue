<template>
  <v-form @submit.prevent="onSubmit">
    <div
      :class="[
        $style['input_group'],
        {
          [$style['input_group--fill']]: val.trim() !== '',
        },
      ]"
    >
      <span :class="$style['search_input']" @click="onSubmit">
        <v-icon :icon="mdiMagnify" color="shades-black" />
      </span>
      <input
        v-model.trim="val"
        placeholder="Search"
        type="text"
        class="app-input"
      >
      <span :class="$style['input_group__clear']" @click="onClear">
        <v-icon :icon="mdiClose" color="shades-black" />
      </span>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'FormSearch',
}
</script>

<script setup>
import { mdiMagnify, mdiClose } from '@mdi/js'
import { shallowRef, useCssModule, onMounted } from 'vue'

const $style = useCssModule()

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['submit'])

const val = shallowRef('')

onMounted(() => {
  val.value = props.value
})

function onSubmit () {
  emits('submit', val.value)
}

function onClear () {
  val.value = ''
  onSubmit()
}
</script>

<style lang="scss" module>
.input_group {
  position: relative;
  height: max-content;
  display: flex;
  align-items: center;
  background: $white;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid $black;

  .search_input {
    box-shadow: none;
    padding-top: 0;
    padding-bottom: 0;
    height: 34px;
    width: 48px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid $black;
  }

  input {
    flex: 1 100000 auto;
    border: none;
  }

  &__clear {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    right: 0;
    width: 34px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
    font-size: 12px;
  }

  &--fill {
    .input_group__clear {
      display: flex;
    }
  }
}
</style>
