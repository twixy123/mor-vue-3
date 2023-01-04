<template>
  <div
    :class="[
      $style['block'],
      {
        [$style['block--has-error']]: hasError,
      },
    ]"
  >
    <p
      v-if="placeholder !== ''"
      :class="[
        $style['placeholder'],
        'text-grey-darken-1',
        {
          [$style['placeholder--active']]: modelValue !== '',
        },
      ]"
    >
      {{ placeholder }}
    </p>
    <div :class="$style['editor']">
      <ckeditor
        :model-value="modelValue"
        :editor="editor"
        :config="editorConfig"
        @input="updateValue"
      />
    </div>

    <div v-if="slots.helpers" :class="[$style['helpers']]">
      <slot name="helpers" />
    </div>

    <div v-if="slots.errors" :class="[$style['helpers'], $style['errors']]">
      <slot name="errors" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWysiwyg',
}
</script>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { ref, useCssModule, useSlots } from 'vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  hasError: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])
const $style = useCssModule()
const slots = useSlots()

const editor = ref(ClassicEditor)
const editorConfig = {}

function updateValue (val) {
  emits('update:modelValue', val)
}
</script>

<style lang="scss" module>
.block {
  position: relative;

  &--has-error {
    .editor {
      border: 1px solid $error;
      box-shadow: 0 0 2px $error;
    }

    .placeholder {
      color: $error !important;
    }
  }
}

.placeholder {
  font-size: 18px;
  position: absolute;
  left: 12px;
  top: 52px;
  z-index: 2;
  transition: all 0.2s ease;

  &--active {
    font-size: 12px;
    top: -7px;
    background: $white;
    padding: 0 9px;
    line-height: 1;
  }
}

.helpers {
  font-size: 12px;
  margin-top: 6px;
}

.errors {
  color: $error;
}
</style>
