export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  const setScrollRestoration = () => {
    if (import.meta.client && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = route.meta.scrollRestoration || 'manual'
    }
  }

  nuxtApp.hook('app:beforeMount', () => {
    setScrollRestoration()
  })

  nuxtApp.hook('page:finish', () => {
    setScrollRestoration()
  })
})
