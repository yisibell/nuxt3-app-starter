const useRequest = () => {
  const appConfig = useAppConfig()

  const apiFetch = $fetch.create({
    baseURL: appConfig.NUXT_APP_BASE_API,
    async onRequest({ request, options }) {
      // Log request
      console.log('[fetch request]', request, options)
    },
    async onResponse({ request, response }) {
      // Log response
      console.log('[fetch response]', request, response.status, response.body)
    },
  })

  return {
    apiFetch,
  }
}

export default useRequest
