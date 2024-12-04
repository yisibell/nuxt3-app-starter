import { useSiteStore } from '~/store/site'
import { $layer } from '~/utils/layer'

export interface IRequestResponse<T> {
  data: T
  message: string
  code: number
}

export interface IRequestExtraOptions {
  /**
   * 是否开启 loading 提示
   */
  loading?: boolean
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

  const request = <T>(url: IFetchMethodParams[0], opts?: IFetchMethodParams[1], extraOpts?: IRequestExtraOptions) => {
    return new Promise<IRequestResponse<T>>((resolve, reject) => {
      if (extraOpts?.loading) {
        $layer.showLoading()
      }

      fetchInstance<IRequestResponse<T>>(url, opts).then(resolve).catch(reject).finally(() => {
        $layer.closeLoading()
      })
    })
  }

  return {
    request,
  }
}

export default useRequest
