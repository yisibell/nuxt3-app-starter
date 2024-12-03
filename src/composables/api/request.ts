import { useSiteStore } from '~/store/site'

export interface IRequestResponse<T> {
  data: T
  message: string
  code: number
}

export type IFetchMethodParams = Parameters<typeof $fetch>

const useRequest = () => {
  const appConfig = useAppConfig()
  const siteStore = useSiteStore()

  const fetchInstance = $fetch.create({
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

  const request = <T>(url: IFetchMethodParams[0], opts?: IFetchMethodParams[1]) => fetchInstance<IRequestResponse<T>>(url, opts)

  return {
    request,
  }
}

export default useRequest
