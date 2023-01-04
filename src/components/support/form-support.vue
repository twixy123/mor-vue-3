<template>
  <v-form @submit.prevent="onSubmit">
    <div>
      <v-text-field
        v-model="v$.question.$model"
        :error-messages="questionErrors"
        required
        counter
        class="mb-2 text-h3"
        label="Question"
        type="text"
        density="compact"
        variant="outlined"
      />
    </div>
    <AppWysiwyg
      v-model="v$.answer.$model"
      :has-error="v$.answer.$dirty && v$.answer.$error"
      placeholder="Answer"
    >
      <template v-if="v$.answer.$dirty && v$.answer.$error" #errors>
        <p v-if="v$.answer.required.$invalid">
          {{ v$.answer.required.$message }}
        </p>
      </template>
    </AppWysiwyg>
    <slot name="actions" />
  </v-form>
</template>

<script>
export default {
  name: 'FormSubmit',
}
</script>

<script setup>
import AppWysiwyg from '@/components/ui/app-wysiwyg.vue'

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { reactive, computed, onBeforeMount } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
})
const emits = defineEmits(['submit'])

defineExpose({ setFormFields })

// const formFields = reactive({
//   question: props.initialData ? props.initialData.question : '',
//   answer: props.initialData ? props.initialData.question : ''
// })

const formFields = reactive({
  question: '',
  answer: '',
})

const rules = computed(() => {
  return {
    question: { required },
    answer: { required },
  }
})

const v$ = useVuelidate(rules, formFields)

const questionErrors = computed(() => {
  const errors = []

  if (!v$.value.question.$dirty) return errors

  v$.value.question.required.$invalid &&
    errors.push(v$.value.question.required.$message)

  return errors
})

onBeforeMount(() => {
  if (props.initialData) {
    setFormFields(props.initialData)
  }
})

function setFormFields (data = {}) {
  if (Object.keys(data).length) {
    formFields.question = data.question
    formFields.answer = data.answer
  }
}

async function onSubmit () {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    emits('submit', { ...formFields })
  }
}
</script>
