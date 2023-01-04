export default {
  install: (app, { shallowRef, computed }) => {
    const loader = shallowRef(false)

    const loaderMethods = {
      value: computed(() => loader.value),
      show () {
        loader.value = true
        document.body.classList.add('stop-scrolling')

        return this
      },
      hide () {
        document.body.classList.remove('stop-scrolling')
        loader.value = false
      }
    }

    app.config.globalProperties.$loader = loaderMethods
    app.provide('loader', loaderMethods)
  }
}
