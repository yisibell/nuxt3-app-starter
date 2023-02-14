import { useSiteStore } from '~/store/site'
export interface IRequestResponse<T> {
  data: T
  message: string
  code: number
}

const useRequest = <T>() => {
  const appConfig = useAppConfig()
  const siteStore = useSiteStore()

  const apiFetch = $fetch.create<IRequestResponse<T>>({
    baseURL: appConfig.NUXT_APP_BASE_API,
    headers: {
      Authorization: siteStore.token,
    },
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
