<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="v$.phone.$model"
      :error-messages="phoneErrors"
      required
      counter
      class="mb-2"
      label="Phone number"
      type="number"
      density="compact"
      variant="outlined"
    />
    <v-text-field
      v-model="v$.password.$model"
      :append-icon="passwordShow ? mdiEye : mdiEyeOff"
      :error-messages="passwordErrors"
      :type="passwordShow ? 'text' : 'password'"
      density="compact"
      variant="outlined"
      label="Password"
      counter
      @click:append="passwordShow = !passwordShow"
    />
    <div class="mt-4">
      <v-btn type="submit" color="info" class="float-right">
        Login
      </v-btn>
    </div>
  </v-form>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { reactive, computed, shallowRef } from 'vue'
import { mdiEye, mdiEyeOff } from '@mdi/js'

const emits = defineEmits(['submit'])

const passwordShow = shallowRef(false)

const formFields = reactive({
  phone: '',
  password: ''
})

const rules = computed(() => {
  return {
    phone: { required, minLength: minLength(11) },
    password: { required, minLength: minLength(4) }
  }
})

const v$ = useVuelidate(rules, formFields)

const phoneErrors = computed(() => {
  const errors = []

  if (!v$.value.phone.$dirty) return errors

  v$.value.phone.required.$invalid &&
    errors.push(v$.value.phone.required.$message)
  v$.value.phone.minLength.$invalid &&
    errors.push(v$.value.phone.minLength.$message)

  return errors
})

const passwordErrors = computed(() => {
  const errors = []

  if (!v$.value.password.$dirty) return errors

  v$.value.password.required.$invalid &&
    errors.push(v$.value.password.required.$message)
  v$.value.password.minLength.$invalid &&
    errors.push(v$.value.password.minLength.$message)

  return errors
})

async function onSubmit () {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    emits('submit', { ...formFields })
  }
}
</script>
