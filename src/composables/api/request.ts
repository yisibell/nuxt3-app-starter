import { showLoadingToast } from 'vant'
import type { ToastWrapperInstance } from 'vant'
import { useSiteStore } from '~/store/site'

export interface IRequestResponse<T = unknown> {
  data: T
  msg: string
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
  const SiteStore = useSiteStore()

  const fetchInstance = $fetch.create({
    baseURL: appConfig.NUXT_APP_BASE_API,
    timeout: 30000,
    onRequest({ options }) {
      options.headers.set('Authorization', SiteStore.accessToken)
    },
    onResponse({ response }) {
      const body = response._data as IRequestResponse<{ location?: string }>
      const { code, data } = body

      if (![200, 201, 0].includes(code)) {
        // 重定向处理
        if ([301, 302].includes(code)) {
          if (data?.location) {
            navigateTo(data.location)
          }
        }
        else {
          console.error('[Response Error Data]:', response)
        }
      }
    },
    onResponseError({ request, response }) {
      // Log error
      console.error(
        '[fetch response error]',
        request,
        response.status,
        response.body,
      )

      const code = response.status

      if ([401].includes(code)) {
        navigateTo('/login')
      }
    },
  })

  const request = <T>(url: IFetchMethodParams[0], opts?: IFetchMethodParams[1], extraOpts?: IRequestExtraOptions) => {
    return new Promise<IRequestResponse<T>>((resolve, reject) => {
      let toast: ToastWrapperInstance

      if (extraOpts?.loading) {
        toast = showLoadingToast({
          message: 'Loading',
          forbidClick: true,
          duration: 0,
        })
      }

      fetchInstance<IRequestResponse<T>>(url, opts).then(resolve).catch(reject).finally(() => {
        if (extraOpts?.loading) {
          toast.close()
        }
      })
    })
  }

  return {
    request,
  }
}

export default useRequest
